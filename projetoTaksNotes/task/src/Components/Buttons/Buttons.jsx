import { Buttonst } from './style.js';

function Buttons({ title, loading = false, icons, ...rest }) {
  return (
    <Buttonst type="button" disabled={loading} {...rest}>
      {loading ? icons : title}
    </Buttonst>
  );
}

export default Buttons;
