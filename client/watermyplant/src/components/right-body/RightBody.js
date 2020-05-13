import React from "react";
import "./RightBody.style.scss";
export default function RightBody() {
  return (
    <div className="right-body-container">
      <h1 className="body-title-tag">Plants need water</h1>
      <section>
        <div className="section section-1">
          <h3>Why do plants need water?</h3>
          <p>
            It’s an easy fact to forget, but life on earth needs water to
            survive, whether it’s you, me, your pet dachshund or the fiddle-leaf
            fig in your hallway. The difference is that plants are about 90%
            water and therefore need more of it compared to most animals. When a
            plant is well-watered, its leaves and stems are in a state called
            turgor, where the cells are at full pressure. The cucumber, pictured
            above, is in this state and this is how we would normally see most
            plants when they’re growing in good conditions.
          </p>
        </div>
        <div className="section section-2">
          <h3>How do plants absorb water?</h3>
          <p>
            There are two processes involved in how a plant absorbs water:
            capillary action and transpiration. Plants absorb water and
            nutrients through the xylem: a tissue made up of thin tubes located
            just below the surface of the plant’s stems. The molecules in this
            tissue attract water molecules from the soil, so that the water is
            pulled upwards. This process is called capillary action. It’s
            similar to what happens when you drink water through a straw.
          </p>
        </div>
        <a
          href="https://kawsarhussen.com/"
          target="_blank"
          className="btn learn-more"
          rel="noopener noreferrer"
        >
          Learn more....
        </a>
      </section>
    </div>
  );
}
