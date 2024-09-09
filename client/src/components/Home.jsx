import "../styles/Home.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <main>
      <div className="home_container">
        <nav>
          <div className="logo">
            <a href="">
              <img src="/images/Home_Page/hostelity_logo.png" alt="" />
            </a>
          </div>
          <div className="nav_menu">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="user">Room</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <button className="book_now" onClick={() => { navigate("/login")}}>Book Now</button>
          </div>
        </nav>
        <div className="hero">
          <h4>Welcoming you to</h4>
          <h1>Hostelity</h1>
          <p>
            Discover the perfect accomodation for your stay with our{" "}
            <span>affordable</span> and <span>comfortable</span> rooms. <br />{" "}
            <i>Mess accounting & management made easy for all.</i>
          </p>
          <div className="hero_btns">
            <button className="explore">
              Explore Now <img src="" alt="in" />
            </button>
            <button className="book_stay">Book Your Stay</button>
          </div>
        </div>
      </div>
      <div className="hero_divider_img">
        <img
          src="/images/Home_Page/hero_divider_lines.png"
          alt="divider_image"
        />
      </div>
      <div className="hero2">
        <div className="About" id="about">
          <section className="about_sec_1">
            <article>
              <div className="abt_txt">
                <h1>Experience the Convenience and Comfort</h1>
                <p>
                  At our hostel we thrive to provide a clean, safe and welcoming
                  environment for all guests. <br /> Our friendly staff is
                  dedicated to ensuring your stay.
                </p>
              </div>
              <div className="abt_img">
                <img
                  src="/images/Home_Page/hostel_image1.jpeg"
                  alt="image of a hostel"
                  loading="lazy"
                />
              </div>
            </article>
          </section>
          <section className="about_sec_2">
            <article>
              <div className="abt_img">
                <img
                  src="/images/Home_Page/studnt_mess.jpg"
                  alt="image of students eating in a mess"
                  loading="lazy"
                />
              </div>
              <div className="abt_txt">
                <h1>Explore our wide range of meals</h1>
                <p>
                  Discover a wide variety of mouth watering meals and dishes at
                  a completely affordable price. <br /> Try{" "}
                  <span>something new everyday</span>, with our meal plans.
                </p>
                <button> <a href="/messMenu">Explore meals</a></button>
              </div>
            </article>
          </section>
        </div>
        <div className="divide_text">
          <img className="img1" src="/images/Home_Page/gradient_lines.png" alt="" />
          <h2>
            Nestled in the heart of the city, our hostel offers a perfect blend
            of comfort, convenience, and affordability
          </h2>
          <img className="img2" src="/images/Home_Page/gradient_lines.png" alt="" />
        </div>
        <div className="gallery">
          <h1>Our Gallery</h1>
          <div className="gallery_img">
          <img src="/images/gallery/gallery_image_1.jpg" alt="glry_img_1" loading="lazy" />
          <img src="/images/gallery/gallery_image_2.jpg" alt="glry_img_2" loading="lazy" />
          <img src="/images/gallery/gallery_image_3.jpg" alt="glry_img_3" loading="lazy" />
          </div>
        </div>
      </div>
      </main>
      <footer>
        <div className="footer_logo">
          <img src="/images/Home_Page/hostelity_logo.png" alt="logo" loading="lazy" />
          <p>Hostelity, Inc. All rights reserved</p>
        </div>
        <div className="contact_links" id="contact">
          <ul>
            <li>
              <h3>Explore</h3>
            </li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Rooms</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Connect</h3>
            </li>
            <li>
              <a href="#" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Youtube
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <h3>More</h3>
            </li>
            <li>
              <a href="#" target="_blank">
                Policies
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Events
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
