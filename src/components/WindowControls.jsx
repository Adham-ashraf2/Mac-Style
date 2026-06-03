const WindowControls = ({ label, onClose }) => (
  <div id="window-controls">
    <button
      type="button"
      className="close"
      aria-label={`Close ${label}`}
      onClick={onClose}
    />
    <span className="minimize" />
    <span className="maximize" />
  </div>
);

export default WindowControls;
