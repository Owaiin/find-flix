import Container from "./Container";
export default function Footer() {
  return (
    <>
      <footer className="w-full bg-deepRed py-5 relative bottom-0">
        <Container>
          <div className="grid md:grid-cols-3">
            <div>
              <h2 className="font-poppins tracking-widest text-2xl uppercase mb-2">
                Find-Flix
              </h2>
              <p>
                Fantastic Movies & TV Shows, <br></br>and Where to Find Them
              </p>
            </div>
            <div></div>
            <div></div>
          </div>
        </Container>
      </footer>
    </>
  );
}
