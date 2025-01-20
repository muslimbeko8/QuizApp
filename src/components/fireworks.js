"use client";
import Fireworks from "fireworks-js";

import React, { useEffect, useRef } from "react";

const FireworksContainer = ({ start }) => {
  const ref = useRef(null);
  const firework = useRef(null);
  useEffect(() => {
    if (ref.current) {
      firework.current = new Fireworks(
        ref.current,
        {
          autoresize: true,
          opacity: 0.5,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 50,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: 30,
          flickering: 50,
          lineStyle: "round",
          hue: {
            min: 0,
            max: 360,
          },
          delay: {
            min: 30,
            max: 60,
          },
          rocketsPoint: {
            min: 50,
            max: 50,
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 3,
            },
            trace: {
              min: 1,
              max: 2,
            },
          },
          brightness: {
            min: 50,
            max: 80,
          },
          decay: {
            min: 0.015,
            max: 0.03,
          },
          mouse: {
            click: false,
            move: false,
            max: 1,
          },
        }
      );
    }
  }, [ref]);
  useEffect(() => {
    if (firework.current) {
      if (start) {
        firework.current.start();
      } else {
        firework.current.stop();
      }
    }
  }, [start]);
  return (
    <div
      className="fixed top-0 start-0 w-full h-full"
      ref={ref}
    ></div>
  );
};

export default FireworksContainer;
