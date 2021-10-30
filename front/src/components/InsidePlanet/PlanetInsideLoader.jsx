import P5Wrapper from "react-p5-wrapper";
import particles from "../particles.js";

const PlanetInsideLoader = () => {
  return (
    <div className="loaderContainer">
      <div className="lloader">
        <P5Wrapper sketch={particles} />
        <div>Loading</div>
        <div className="circleContainer">
          <div className="circle circle21"></div>
          <div className="circle circle31"></div>
          <div className="circle circle41"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
          <div className="circle circle7"></div>
          <div className="circle circle8"></div>
          <div className="circle circle9"></div>
          <div className="circle circle10"></div>
          <div className="circle circle11"></div>
          <div className="circle circle12"></div>
          <div className="circle circle13"></div>
          <div className="circle circle14"></div>
          <div className="circle circle15"></div>
        </div>
      </div>
    </div>
  );
};

export default PlanetInsideLoader;
