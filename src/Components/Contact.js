import "../styling/Contact.css";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function validateForm(state) {
  for (const key in state) {
    if (key === "email") {
      if (/\S+@\S+\.\S+/.test(state[key])) {
        return true;
      }
      toast("You have entered an invalid email address!");
      return false;
    }
  }
}

class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const valid = validateForm(this.state);
    document.getElementById("contact_form_actual").reset();

    if (valid === true) {
      const dataToSend = this.state;

      //post request to server - sends mail
      var sendMail = await axios.post(
        `https://us-central1-itsshubhaofficial.cloudfunctions.net/sendMail`,
        dataToSend
      );

      if (sendMail.data !== "Email sent") {
        toast("Please try again!");
      } else {
        toast("Thank you!");
      }
    }
  };

  render() {
    return (
      <>
        <div className="contact_page">
          <div className="contact_col_left"></div>
          <div className="contact_col_right">
            <div className="contact-content">
              <div>
                <h2 className="universal_font get-in-touch">GET IN TOUCH</h2>
              </div>
              <p className="contact_info">
                Tel: 832-466-7913 | Email: info@itsshubhaofficial.com
              </p>
            </div>
            <div className="contact_form">
              <form id="contact_form_actual" onSubmit={this.handleSubmit}>
                <label for="fname">First Name</label>
                <div>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    onChange={this.handleChange}
                    placeholder="Your first name"
                    required="true"
                  />
                </div>
                <label for="lname">Last Name</label>
                <div>
                  <input
                    type="text"
                    id="lname"
                    name="lastname"
                    onChange={this.handleChange}
                    placeholder="Your last name"
                    required="true"
                  />
                </div>
                <label for="email">Email</label>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    placeholder="example@example.com"
                    required="true"
                  />
                </div>
                <label for="subject">Subject</label>
                <div>
                  <input
                    id="subject"
                    name="subject"
                    onChange={this.handleChange}
                    placeholder="Subject..."
                    required="true"
                  />
                </div>
                <label for="message">Message</label>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    onChange={this.handleChange}
                    placeholder="Message..."
                    required="true"
                  ></textarea>
                </div>

                <button type="submit" className="submit_button">
                  Submit
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Contact;
