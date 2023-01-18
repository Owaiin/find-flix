import Container from "./Container";
import Link from "next/link";
export const Navbar = () => {
  return (
    <>
      <div className="w-screen h-20 bg-darkgrey">
        <Container>
          <div className="flex items-center h-full">
            <Link
              href="/"
              className="font-poppins text-2xl tracking-widest uppercase "
            >
              Find-Flix
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};
