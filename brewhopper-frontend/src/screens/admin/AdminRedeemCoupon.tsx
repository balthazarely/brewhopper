import { useLocation } from "react-router-dom";
import { PageWrapper } from "../../components/elements";
import {
  useGetCouponByIdQuery,
  useRedeemCouponMutation,
} from "../../slices/achievementSlice";

export default function AdminRedeemCoupon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const { data: couponData } = useGetCouponByIdQuery(id);
  const [redeemCoupon] = useRedeemCouponMutation();

  const redeemHandler = async () => {
    await redeemCoupon(id);
  };

  return (
    <PageWrapper classname="mt-16 text-center">
      <div className="text-2xl">Submit Coupon Code</div>
      {couponData && (
        <div className="w-full flex items-center flex-col mt-8">
          <div>Code: {couponData._id}</div>
          <div>Prize: {couponData.prize}</div>
          <div>isActive: {couponData.isActive ? "true" : "false"}</div>
          <button
            disabled={!couponData.isActive}
            onClick={redeemHandler}
            className="btn btn-primary"
          >
            {!couponData.isActive ? "Already redeebed" : "Redeem Code"}
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
