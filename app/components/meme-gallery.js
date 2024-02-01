"use client";
import "photoswipe/dist/photoswipe.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { fetchMemes } from "../utils/api";

const MemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastMemeRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { memes: newMemes, after: newAfter } = await fetchMemes(after);
      setMemes((prevMemes) => [...prevMemes, ...newMemes]);
      setAfter(newAfter);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchData();
  };

  return (
    <div>
      <div className="gallery-container">
        <Gallery>
          {memes.map((meme, index) => (
            <Item
              key={meme.id}
              original={meme.url}
              thumbnail={meme.thumbnail}
              width="100%"
              height="100%"
            >
              {({ ref, open }) => (
                <div className="gallery-item">
                  <img
                    ref={ref}
                    onClick={open}
                    width="full"
                    height="full"
                    src={meme.thumbnail}
                    alt="Image Not Found"
                    index={index}
                    total={memes.length}
                  />
                </div>
              )}
            </Item>
          ))}
          <div ref={lastMemeRef} style={{ height: "10px" }} />
          {loading && (
            <div className="loading-indicator">
              <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </Gallery>
      </div>
    </div>
  );
};

export default MemeGallery;
