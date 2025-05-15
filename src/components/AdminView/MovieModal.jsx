import React from "react";
import { Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieModal({ item, onClose }) {
  console.log("item in modal:", item);

  const modalVariants = {
    hidden: { opacity: 0, y: "-60px", scale: 0.75 },
    visible: {
      opacity: 1,
      y: "0px",
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: "-80px",
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      <Modal show={true} onHide={onClose} centered size="md">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            backgroundColor: "#212121",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#212121", color: "white" }}
          >
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ height: "300px" }}>
              <img
                src={item.poster_url}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "fill",
                }}
              />
            </div>
            <p className="mt-3">
              <strong style={{ color: "#3dd2cc" }}>Genre:</strong>{" "}
              {item.genres.join(", ")}
            </p>
            <p>
              <strong style={{ color: "#3dd2cc" }}>Year:</strong>{" "}
              {item.release_date}
            </p>
            <p>
              <strong style={{ color: "#3dd2cc" }}>Description:</strong>{" "}
              {item.overview}
            </p>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: "#212121", color: "white" }}>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}
