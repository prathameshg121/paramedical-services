import React from "react";

export const ContactUs = (props) => {
  return (
    <div className="contact_info">
      <div className="container-fluid">
        <div className="row contact-card">
          <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
            {/* Phone Number */}

            <div className="text-center shadow px-3 phone-info contact_info_item border  d-flex align-items-center " >
              <img src="https://img.icons8.com/office/24/000000/iphone.png " />
              <div className="contact_info_content ml-3 ">
                <div className="font-weight-bold contact_info_title">Phone</div>
                <div className="contact_info_text">+91 724 044 2912</div>
              </div>
            </div>
            <div className="text-center shadow px-3 contact_info_item border d-flex align-items-center">
              <img src="https://img.icons8.com/external-justicon-lineal-justicon/64/000000/external-email-office-stationery-justicon-lineal-justicon.png" />
              <div className="contact_info_content ml-3">
                <div className="font-weight-bold contact_info_title">Email</div>
                <div className="contact_info_text">
                  servicesparamedical2@gmail.com
                </div>
              </div>
            </div>
            <div className="text-center shadow px-3 contact_info_item border d-flex  align-items-center">
              <img src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/000000/external-mentor-distance-mentoring-inipagistudio-mixed-inipagistudio.png" />
              <div className="contact_info_content ml-3">
                <div className="font-weight-bold contact_info_title">
                  Mentor
                </div>
                <div className="contact_info_text">Dr.V B Nikam Sir</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}

      <div className="contact_form" >
        <div className="container shadow  border">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                  <div className="contact_form_title get-in-touch  text-bold center">
                     
                      <h1>Get In Touch</h1>
                  </div>

                  <form id="contact_form">
                      <div className="contact_form_named d-flex justify-content-between align-items-between">
                          <input type="text" id="contact_form_name" className="contact_form_name input_field"
                          placeholder="Your Name" required="true" />
                          <input type="text" id="contact_form_email" className="contact_form_name input_field"
                          placeholder="Your Email" required="true" />
                          <input type="text" id="contact_form_phone" className="contact_form_name input_field"
                          placeholder="Your Phone Number" required="true" />



                    </div> 


                    <div className="contact_form_text mt-5">
                        <textarea className="text_field contact_form_message" placeholder="Message" cols="122" rows="10"></textarea>
                    </div>
                  </form>
              </div>
            </div>
          </div>
          <button className="btn-primary contact-btn" style={{margin:"30px"}}>Send</button>
        </div>
       
      </div>
    </div>
  );
};
