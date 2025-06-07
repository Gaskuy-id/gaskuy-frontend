// const importAll = (r) => {
//     let images = {};
//     r.keys().forEach((item) => {
//         images[item.replace('./', '')] = r(item);
//     });
//     return images;
// };

// // Ini otomatis import semua gambar dari /assets/images
// const images = importAll(
//     require.context('../assets/images', false, /\.(png|jpe?g|svg|webp)$/)
// );

// export default images;
