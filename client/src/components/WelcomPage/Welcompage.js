import react from "react";
import { useHistory } from "react-router";
import WelcomImg from "../images/welcomImg.jpg";
import Map from "../Map/mapComponents/Container";
import Header from "../HomePage/Header/Header";
import DevicesOutlinedIcon from "@material-ui/icons/DevicesOutlined";
export default function WelcomPage() {
  let history = useHistory();

  function UserSignUpPage() {
    history.push("/UserHomePage");
  }

  function ApplicationPage() {
    history.push("./AppliSignUp");
  }
  function ShowMap() {
    history.push("./Map");
  }
  

  return (
    <div>
      {/* <a href="">
            <img src={require('./logo.jpg').default} height={50} width={100} />
        </a> */}
      <Header class="header-class" />

      <div className="homepage ">
        <section id="starter">
          <div className=" row homeContainer w-100 100vh">
            <div className=" col-lg-6 features-class banner">
              <h1>Paramedical Help</h1>
              <h3>Bring The Future of</h3>
              <h3>Health Care</h3>
              <button onClick={UserSignUpPage}>Get Started</button>
              <br />
              {/* <button onClick={ApplicationPage}>Apply</button> */}
              {/* <button onClick={ShowMap}> Map </button> */}
            </div>

            <div className="col-lg-6 features-class proImg">
              <img
                className="homeImg"
                src="https://image.freepik.com/free-vector/medical-good-team-hospital-staff-doctors-nurse-illustration_1284-53038.jpg"
              ></img>
            </div>
          </div>
        </section>

        <section id="features">
          <div class="row">
            <div class="col-lg-3 features-class ">
              <i class=" featureicon fas fa-map-marker-alt"></i>
              <h3>Maped services </h3>
              <p>
                Get the near by health care services. Search by state, location,
                service type{" "}
              </p>
            </div>
            <div class="col-lg-3 features-class">
              <i class="featureicon fas fa-user-md"></i>
              <h3>Get Job</h3>
              <p>Have Paramediacal Skills? Apply for job...</p>
            </div>
            <div class="col-lg-3 features-class">
              <i class="featureicon fas fa-hand-holding-medical"></i>
              <h3>Multiple Facility</h3>
              <p>Wide varity of health services are present.</p>
            </div>
            <div class="col-lg-3 features-class">
              <DevicesOutlinedIcon
                style={{ fontSize: 70 }}
                className="featureicon"
              />
              <h3>Responsive interface</h3>
              <p>User Faindly interface. Easy to use.</p>
            </div>
          </div>
        </section>

        <div>
          <section id="spon">
            {/* <div>
            <h3>spon</h3>
            <img className="testimonial-image" src="https://s.tmimgcdn.com/scr/800x500/110300/medical-tech-logo-template_110323-original.jpg" />
            <img className="testimonial-image" src="https://thumbs.dreamstime.com/b/globe-world-medical-logo-template-vector-concept-icon-element-sign-white-background-ai-illustrations-company-clean-water-131866593.jpg" />
            <img className="testimonial-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyK5BZO6UcHN2Xn7HmuZrLTV29m_bmznmvg&usqp=CAU" />
            <img className="testimonial-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRJdFKLbjREZCXvr2HamuPbP8d6zJVnpmvBw&usqp=CAU" />
            <img className="testimonial-image" src="https://png.pngtree.com/png-clipart/20200710/original/pngtree-medical-logo-and-icon-design-png-image_4149062.jpg" />
            <img className="testimonial-image" src="https://images.assetsdelivery.com/compings_v2/sokolfly/sokolfly1806/sokolfly180600220.jpg" />
          </div> */}

            <div class="table-home">
              <table >
                <tr>
                  <th>Explore</th>
                  <th>Contacts</th>
                  <th>Legal</th>
                </tr>

                <tr>
                  <td>Home</td>
                  <td>+91 724 044 2912 </td>
                  <td>Terms</td>
                </tr>
                <tr>
                  <td>About</td>
                  <td>servil2@gmail.com</td>
                  <td>Privacy</td>
                </tr>
              </table>
            </div>
            <hr class="end-homepage-line"></hr>
            <h5>Follow</h5>
            <a style={{margin:"20px"}}
              hrf="https://twitter.com/i_m_shivv"
              class="icon-button twitter"
            >
              <i class="fab fa-twitter icon-twitter"></i>
              <span></span>
            </a>
            <a style={{margin:"20px"}}
             href="https://facebook.com" class="icon-button facebook">
              <i class="fab fa-facebook-f icon-facebook"></i>
              <span></span>
            </a>
            <a style={{margin:"20px"}} 
            href="https://plus.google.com" class="icon-button google-plus">
              <i class="fab fa-google-plus-g icon-google-plus"></i>
              <span></span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
