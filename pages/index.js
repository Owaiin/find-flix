import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

// import the database from firebaseConfig folder
import { db } from "../firebase/firebaseConfig";
// import functions for Firestore
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

// Setup a reference to the books collection within db
const colRef = collection(db, "books");

const inter = Inter({ subsets: ["latin"] });
// console.log(books);
export default function Home() {
  const [bookData, setBookData] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPages, setBookPages] = useState(null);

  const handleFormInput = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "title") {
      setBookTitle(value);
      // console.log(value);
    }
    if (id === "author") {
      setBookAuthor(value);
      // console.log(value);
    }
    if (id === "pages") {
      setBookPages(value);
      // console.log(value);
    }
  };

  const handleAddBook = (e) => {
    let newBook = {
      title: bookTitle,
      author: bookAuthor,
      pageNum: bookPages,
    };
    // addDoc(colRef, newBook);
    addDoc(colRef, {
      title: bookTitle,
      author: bookAuthor,
      pageNum: bookPages,
    });
    getBookData();
    document.getElementById("addBookForm").reset();
    // e.reset();
  };

  const handleDeleteDoc = (id) => {
    const targetDoc = doc(db, "books", id);
    deleteDoc(targetDoc);
    getBookData();
    // getBookData();
  };

  const getBookData = () => {
    getDocs(colRef)
      .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        // console.log(books);
        setBookData(books);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBookData();
  }, []);
  // // use getDocs to get a snapshot of the current documents in collection

  return (
    <>
      <div className="w-5/6 mx-auto ">
        <h2 className="font-semibold text-xl">Firebase Firestore</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <ul className="">
              {bookData.map((book, index) => {
                return (
                  <li
                    className=" list-none border my-5 p-5 bg-white shadow-md rounded-md "
                    key={index}
                  >
                    <p className="font-semibold">{book.title}</p>
                    <p>Author: {book.author}</p>
                    <p>Pages: {book.pageNum}</p>
                    <button
                      className=" bg-red-400 py-1 px-3 text-white font-medium rounded-md mt-2"
                      onClick={() => handleDeleteDoc(book.id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="order-first md:order-none">
            <form
              id="addBookForm"
              onSubmit={(event) => {
                event.preventDefault();
                handleAddBook(event);
              }}
              className="add flex flex-col"
              action=""
            >
              <label htmlFor="title">Title:</label>
              <input
                className=" border rounded-md mb-2"
                onChange={(e) => handleFormInput(e)}
                id="title"
                type="text"
                name="title"
                required
              />
              <label htmlFor="author">Author</label>
              <input
                onChange={(e) => handleFormInput(e)}
                className=" border rounded-md mb-2"
                id="author"
                type="text"
                name="author"
                required
              />
              <label htmlFor="pages">Number of Pages</label>
              <input
                onChange={(e) => handleFormInput(e)}
                className=" border rounded-md mb-2"
                id="pages"
                type="number"
                name="pages"
              />

              <button className="bg-slate-500 rounded-md self-start px-5 py-3 mt-2 text-white">
                Add book to list
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
