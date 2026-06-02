import api from "../api/client";

export const getAdminProductReviews =
  async (
    productId,
    page = 1,
    sort = "latest"
  ) => {

    return api.get(
      `/admin/reviews/products/${productId}/reviews?page=${page}&sort=${sort}`
    );

  };


  export const moderateReview =
  (
    reviewId,
    data
  ) =>
    api.patch(
      `/admin/reviews/reviews/${reviewId}/moderate`,
      data
    );



    export const deleteReviewAdmin =
  (
    reviewId,
    reason
  ) =>
    api.patch(
      `/admin/reviews/reviews/${reviewId}/delete`,
      {
        reason,
      }
    );
