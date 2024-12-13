import React from "react";
import axios from "axios";

const GameFavouriteButton = ({ userId, gameId, isFavourite, onUpdate }: any) => {
  const toggleFavourite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${userId}/favourite`,
        { gameId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        onUpdate(gameId, !isFavourite); // Cập nhật trạng thái yêu thích
      }
    } catch (error: any) {
      console.error("Cập nhật yêu thích thất bại:", error.message);
      alert("Đã xảy ra lỗi khi cập nhật yêu thích.");
    }
  };

  return (
    <button onClick={toggleFavourite} className="flex flex-col justify-center py-1">
      <img
        loading="lazy"
        src={
          isFavourite
            ? "https://example.com/icon-favourite-filled.png"
            : "https://example.com/icon-favourite-outline.png"
        }
        alt="Toggle Favourite"
        className="object-contain aspect-square w-[21px]"
      />
    </button>
  );
};

export default GameFavouriteButton;
