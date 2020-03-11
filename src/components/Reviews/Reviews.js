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
        <image alt="profile pic" />
        <h6>Andre Texiera</h6>
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
        <image alt="profile pic" />
        <h6>Avery Johnson</h6>
      </section>
      <section className="review-box success-box">
        <p>
          October arrived, spreading a damp chill over the grounds and into the
          castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of
          colds among the staff and students. Her Pepperup potion worked
          instantly, though it left the drinker smoking at the ears for several
          hours afterward.
        </p>
        <image alt="profile pic" />
        <h6>Andre Texiera</h6>
      </section>
    </div>
  );
};

export default Reviews;
