import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FaTachometerAlt } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import SeatIcon from "../../assets/images/seat.png";
import Layout from "../../components/Layout/Layout";  
import profileDummy from "../../assets/images/templateprofile.jpg";
import star from "../../assets/images/star.png";
import { LucideLuggage } from "lucide-react";
import api from "../../utils/api";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const tipeLayanan = location.state?.tipeLayanan;
  const [mainImage, setMainImage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  
  // Reviews state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const reviewsPerPage = 5;

  // Function to format price to Rupiah format
  const formatRupiah = (price) => {
    // Remove any non-digit characters and convert to number
    const number = typeof price === 'string' ? 
      parseInt(price.replace(/\D/g, '')) : 
      parseInt(price);
    
    if (isNaN(number)) return 'Rp 0';
    
    // Format with thousand separators
    return `Rp${number.toLocaleString('id-ID')}`;
  };


  const handlePesanSekarang = () => {
    if (!tipeLayanan) {
      alert("Silahkan pilih tipe layanan terlebih dahulu.");
      return;
    }

    const typeParam = tipeLayanan === "dengan" ? "driver" : "no-driver";
    navigate(`/book/${typeParam}`, { state: { car, tipeLayanan } });
  };

  useEffect(() => {
    if (!car) {
      navigate("/booking");
    } else {
      // Set gambar utama dan thumbnails
      setMainImage(car.imageSrc);

      const detailImages = car.detailImage || [];
      const uniqueThumbnails = [
        car.imageSrc,
        ...detailImages.filter((img) => img !== car.imageSrc),
      ];
      setThumbnails(uniqueThumbnails);

      // Ambil review dari API
      const fetchReviews = async () => {
        try {
          const res = await api.get(`/vehicle/${car.id}/review`);
          const reviewsFromAPI = res.data.data.map((item) => ({
            id: item.id,
            name: item.customerId?.fullName || "User",
            date: item.reviewAddedAt,
            rating: item.rating,
            comment: item.review,
            avatar: item.customerId?.image || profileDummy,
          }));
          setAllReviews(reviewsFromAPI);
        } catch (error) {
          console.error("Gagal mengambil data ulasan:", error);
        }
      };

      fetchReviews();
    }
  }, [car, navigate]);

  // Filter reviews based on selected filter
  const getFilteredReviews = () => {
    if (selectedFilter === "Semua") {
      return allReviews;
    }
    const rating = parseInt(selectedFilter.split(" ")[0]);
    return allReviews.filter(review => review.rating === rating);
  };

  // Get current reviews for pagination
  const getCurrentReviews = () => {
    const filteredReviews = getFilteredReviews();
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  };

  // Get total pages
  const getTotalPages = () => {
    const filteredReviews = getFilteredReviews();
    return Math.ceil(filteredReviews.length / reviewsPerPage);
  };

  // Get review counts for each rating
  const getReviewCounts = () => {
    const counts = { total: allReviews.length, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach(review => {
      counts[review.rating]++;
    });
    return counts;
  };

  // Calculate average rating
  const getAverageRating = () => {
    const total = allReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / allReviews.length).toFixed(1);
  };

  // Render star rating using star image
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <img
        key={index}
        src={star}
        alt="star"
        className={`w-4 h-4 ${index < rating ? 'opacity-100' : 'opacity-30 grayscale'}`}
      />
    ));
  };

  // Render larger star rating for summary section
  const renderLargeStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <img
        key={index}
        src={star}
        alt="star"
        className={`w-6 h-6 ${index < rating ? 'opacity-100' : 'opacity-30 grayscale'}`}
      />
    ));
  };

  const reviewCounts = getReviewCounts();
  const currentReviews = getCurrentReviews();
  const totalPages = getTotalPages();

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Tombol kembali */}
        <Link to="/booking" className="flex items-center gap-2 mb-6 group">
          <div className="w-8 h-8 flex items-center justify-center bg-[#5D8B68] rounded-lg transition-colors duration-300 group-hover:bg-green-800">
            <Icon icon="weui:back-filled" className="text-white text-lg" />
          </div>
          <span className="text-green-700 font-medium text-sm group-hover:text-green-800">
            Kembali
          </span>
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Kolom Kiri: Gambar Mobil */}
          <div className="flex-1">
            {/* Kotak gambar utama */}
            <div className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md border overflow-hidden flex items-center justify-center bg-white">
              <img
                src={mainImage}
                alt={car.title}
                className="w-auto h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-5 mt-6 justify-center">
              {thumbnails.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-24 h-24 rounded-md border bg-white p-1 flex items-center justify-center cursor-pointer transition duration-200 ${
                    mainImage === img
                      ? "ring-2 ring-green-700"
                      : "hover:ring-2 hover:ring-green-700"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`Detail Image ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Info Mobil */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="ml-1">
                <h1 className="text-3xl font-bold mb-3">{car.title}</h1>
                <p className="text-xl font-semibold text-green-700 mb-6">
                  {formatRupiah(car.pricePerHour)}/Jam
                </p>

                <h2 className="text-lg font-semibold mb-2">Spesifikasi:</h2>
                <ul className="space-y-3 mb-8 text-gray-700 text-lg">
                  <li className="flex items-center gap-2">
                    <FaTachometerAlt className="w-4 h-4" /> {car.engineCapacity}{" "}
                    CC
                  </li>
                  <li className="flex items-center gap-2">
                    <GiSteeringWheel className="w-4 h-4" /> {car.transmission}
                  </li>
                  <li className="flex items-center gap-2">
                    <img src={SeatIcon} alt="Seat" className="w-4 h-4" />{" "}
                    {car.seats} orang
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideLuggage className="w-4 h-4" /> {car.luggage} liter
                  </li>
                </ul>
              </div>
              {/* Tombol Pesan Sekarang */}
              <button
                onClick={handlePesanSekarang}
                className="bg-[#335540] hover:bg-green-800 text-white py-2 px-3 rounded-full text-sm font-semibold w-80 h-10"
              >
                PESAN SEKARANG
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Penilaian Kendaraan</h2>
          
          {/* Rating Summary */}
          <div className="bg-[#335540] rounded-lg p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-bold">{getAverageRating()}</span>
                  <span className="text-lg">dari 5</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {renderLargeStars(Math.floor(parseFloat(getAverageRating())))}
                </div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 ml-auto">
                <button
                  onClick={() => {
                    setSelectedFilter("Semua");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedFilter === "Semua"
                      ? "bg-[#F9F949] text-black ring-1 ring-[#F9F949]"
                      : "bg-[#335540] text-white hover:bg-green-700 ring-1 ring-white"
                  }`}
                >
                  Semua
                </button>
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => {
                      setSelectedFilter(`${rating} Bintang`);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors  ${
                      selectedFilter === `${rating} Bintang`
                        ? "bg-[#F9F949] text-black ring-[#F9F949]"
                        : "bg-[#335540] text-white hover:bg-green-700 ring-1 ring-white" 
                    }`}
                  >
                    {rating} Bintang
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{review.date}</p>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon icon="grommet-icons:link-previous" className="text-sm" />
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === pageNumber
                          ? "bg-[#5D8B68] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
                <Icon icon="grommet-icons:link-next" className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;