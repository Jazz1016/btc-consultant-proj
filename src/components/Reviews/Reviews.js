import React from "react";
import "./Review.scss";

const Reviews = () => {
  return (
    <div className="review-center">
      <section className="review-box light-box">
        <p>
          October arrived, spreading a damp chill over the grounds and into the
          castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of
          colds among the staff and students. Her Pepperup potion worked
          instantly, though it left the drinker smoking at the ears for several
          hours afterward.
        </p>
        <div>
          <img
            src="https://ca.slack-edge.com/T039C2PUY-URFR6EFPS-2d275a767305-512"
            alt="profile pic"
          />
          <h6>Andre Texiera</h6>
        </div>
      </section>
      <section className="review-box info-box">
        <p>
          I was skeptical about Meteor at first, but after receiving consulting
          from their top bitcoin expert James Lea, my life has changed. I have
          become a multimillionaire while basically doing nothing and I can feel
          my skull expanding to contain my new big brain. It was more than
          learning about some obscure cryptocurrency, it was a spiritual
          awakening. :{`)`}
        </p>
        <div>
          <img
            src="https://ca.slack-edge.com/T039C2PUY-URAH0ASLQ-8a6601fa4a0d-512"
            alt="profile pic"
          />
          <h6>Avery Johnson</h6>
        </div>
      </section>
      <section className="review-box success-box">
        <p>
          My kid made sure he was some kind of enemy agent—might have been
          dropped by parachute, for instance. But here’s the point, old boy.
          What do you think put her on to him in the first place? She spotted he
          was wearing a funny kind of shoes—said she’d never seen anyone wearing
          shoes like that before. So the chances were he was a foreigner. Pretty
          smart for a nipper of seven, eh?
        </p>
        <div>
          <img
            src="https://ca.slack-edge.com/T039C2PUY-USH9ZNNMS-1b039d240e61-512"
            alt="profile pic"
          />
          <h6>Joshua Smith</h6>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
