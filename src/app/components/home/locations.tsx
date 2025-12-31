export const Location = () => {
  return (
    <div className="w-full h-[45vh] rounded-xl overflow-hidden ">
      <iframe
        src="https://www.google.com/maps?hl=en&q=45.82538639756957,3.146638509307494&z=16&output=embed"
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        // allowFullScreen
      />
    </div>
  );
};
