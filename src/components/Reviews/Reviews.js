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
            src="https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/best_linkedin_photos.jpg"
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
            src="https://i.pinimg.com/originals/f3/c6/8e/f3c68ef3a73b98a0414dd9cbd8fa696e.jpg"
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmbsIg34RwQtK_SA8iuu-lKr4lCFDUPog_-crMArgkVlmCwv3m&usqp=CAU"
            alt="profile pic"
          />
          <h6>Joshua Smith</h6>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
