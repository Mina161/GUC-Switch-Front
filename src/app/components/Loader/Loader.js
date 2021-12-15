import Loader from "react-loader-spinner";
export const Loading = ({color}) => {
    return (
      <Loader
        type="ThreeDots"
        color={color}
        height={100}
        width={100}
        timeout={30000}
      />
    );
}