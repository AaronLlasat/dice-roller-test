const blank = <div className="dice first-face"> <span className="text-white text-6xl ">&#63;</span> </div>;

const dot = <div className="dice first-face"> <span className="dot"> </span> </div>;

const secondFace = <div className="dice second-face"> <span className="dot"> </span> <span className="dot"> </span> </div>;

const thirdFace = <div className="dice third-face"> <span className="dot"></span> <span className="dot"></span> <span className="dot"></span> </div>;

const fourthFace = <div className="fourth-face dice"> <div className="column"> <span className="dot"></span> <span className="dot"></span> </div> <div className="column"> <span className="dot"></span> <span className="dot"></span> </div> </div>;

const fifthFace = <div className="fifth-face dice"> <div className="column"> <span className="dot"></span> <span className="dot"></span> </div> <div className="column"> <span className="dot"></span> </div> <div className="column"> <span className="dot"></span> <span className="dot"></span> </div> </div>;

const sixthFace = <div className="sixth-face dice"> <div className="column"> <span className="dot"></span> <span className="dot"></span> <span className="dot"></span> </div> <div className="column"> <span className="dot"></span> <span className="dot"></span> <span className="dot"></span> </div> </div>;

export { blank, dot, secondFace, thirdFace, fourthFace, fifthFace, sixthFace };