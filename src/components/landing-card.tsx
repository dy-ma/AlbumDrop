import * as motion from "motion/react-client";

export default function EnvelopeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: [0, 1.2, 1] }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center h-80 w-64"
    >
      {/* Envelope */}
      <motion.div
        className="relative w-64 h-40 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center"
      >
        {/* Envelope Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 180 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 w-full h-1/2 bg-orange-600 rounded-t-lg origin-bottom"
        />

        {/* Note */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: -40, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute w-52 h-32 bg-white shadow-md rounded-md flex items-center justify-center text-center p-4"
        >
          <p className="text-gray-700 font-semibold">Share Anything</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}