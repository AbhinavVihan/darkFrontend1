import { FC, memo } from "react";

interface Props {}

const NotFound: FC<Props> = (props) => {
  return (
    <div className="h-screen bg-green-600">Sorry the page does not exist</div>
  );
};

NotFound.defaultProps = {};

export default memo(NotFound);
