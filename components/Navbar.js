import Container from "./Container";
export const Navbar = () => {
  return (
    <>
      <div className="w-screen h-20 bg-darkgrey">
        <Container>
          <div className="flex items-center h-full">
            <p className="font-poppins tracking-widest uppercase font-bold text-2xl">
              Find-Flix
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};
