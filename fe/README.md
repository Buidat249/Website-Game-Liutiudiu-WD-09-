<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
=======
#1 Chào mừng đến với Dự án Tốt nghiệp của nhóm tôi 🎓

- Cảm ơn bạn đã ghé thăm repository của nhóm tôi!
- Đây là dự án tốt nghiệp của nhóm tôi với chủ đề **[WEBSITE GAME LIUTIUDIU]**, được thực hiện trong quá trình học tại [trường Cao Đẳng FPT POLYTECHNIC].

#2 📝 Giới thiệu

- Mục tiêu:
  
+ Dự án này nhằm xây dựng một hệ thống bán game trực tuyến với tên gọi Website Game Liutiudiu.
  
+ Hệ thống giúp người dùng dễ dàng tìm kiếm, mua các tựa game yêu thích, đồng thời cung cấp trải nghiệm mua sắm trực quan và tiện lợi.
  
+ Dự án sẽ tập trung vào việc quản lý các danh mục game, thương hiệu game, và tối ưu hóa quy trình thanh toán để mang lại sự tiện dụng cho khách hàng.

- Ý nghĩa:
  
+ Dự án không chỉ là cơ hội để áp dụng kiến thức về lập trình, thiết kế cơ sở dữ liệu và phát triển web, mà còn là bước đệm để nâng cao khả năng làm việc thực tế, chuẩn bị cho công việc chuyên nghiệp sau này.
  
+ Nó đồng thời đáp ứng nhu cầu thực tiễn của thị trường game đang ngày càng phát triển và mang lại giá trị thiết thực cho người dùng yêu thích game.  
  
-  Qua dự án này, tôi mong muốn ứng dụng kiến thức đã học vào thực tiễn và tạo ra một sản phẩm có tính ứng dụng cao.

#3 💡 Hướng dẫn sử dụng 

- Để có thể cài đặt và sử dụng hệ thống Website Game Liutiudiu, bạn vui lòng thực hiện theo các bước dưới đây:

1. Yêu cầu hệ thống
   
- Trước khi bắt đầu, bạn cần đảm bảo rằng máy tính của bạn đã cài đặt các công cụ sau:
  
+ Node.js (phiên bản 14.x trở lên).
  
+ MongoDB (để làm cơ sở dữ liệu).
  
+ Postman (để kiểm tra và gửi các yêu cầu API).
  
+ Visual Studio Code (để chỉnh sửa mã nguồn)

2. Clone repository
   
- Trước tiên, bạn cần sao chép (clone) repository dự án về máy tính của bạn bằng cách sử dụng Git. Mở terminal (hoặc command prompt) và chạy lệnh sau:
  
  [ git clone https://github.com/Buidat249/Website-Game-Liutiudiu-WD-09-.git ]

- Thao tác này sẽ tải toàn bộ mã nguồn của dự án về thư mục mà bạn chọn.  

3. Cài đặt các dependencies
 
- Khi bạn đã vào được trong file của dự án, bạn cần di chuyển vào các thứ mục be, fe để cài đặt các thư viện và chạy bằng cách mở terminal và nhập:
  
B1: Đầu tiên mở terminal bằng phím tắt : [ Ctrl ` ]

B2: Bạn sẽ di chuyển vào trong các thứ mục SU24 trước sau đó đến thư mục như là be, fe :[ cd SU24 rồi đến cd be hoặc cd fe ]

B3: Sau khi bạn di chuyển vào trong thư mục be hoặc fe bạn cần cài đặt thư viện :[ npm i ] 

- Lệnh này sẽ tải và cài đặt tất cả các gói cần thiết đã được liệt kê trong file package.json, bao gồm các thư viện front-end và back-end cần thiết để hệ thống hoạt động.

4. Cấu hình cơ sở dữ liệu

- Dự án sử dụng MongoDB làm cơ sở dữ liệu. Bạn cần thực hiện các bước sau để cấu hình cơ sở dữ liệu:
  
B1: Cài đặt MongoDB trên máy tính nếu chưa có.

B2: Mở MongoDB và tạo một cơ sở dữ liệu mới với tên gọi [ game_store ].

5. Chạy back-end và front-end

- Sau khi đã cài đặt tất cả các phụ thuộc và cấu hình cơ sở dữ liệu, bạn có thể khởi chạy [ db.json ] ,back-end và front-end của dự án.
  
+ Back-end:
  
B1: Đầu tiên mở terminal bằng phím tắt [ Ctrl ` ]

B2: Bạn sẽ di chuyển vào trong các thứ mục SU24 trước sau đó đến thư mục be [ cd SU24 rồi đến cd be ]

B3: Sau khi bạn di chuyển vào trong thư mục be, bạn cần cài đặt thư viện [ npm i ] 

B4: Cài đặt thự viện xong bạn viết câu lệnh [ npm run dev ] để back-end có thể chạy cổng

+ Front-end:
  
B1: Bạn tạo terminal mới bằng di chuyển chuột sang bên phải có nút hình + để tạo terminal mới

B2: Bạn sẽ di chuyển vào trong các thứ mục SU24 trước sau đó đến thư mục fe [ cd SU24 rồi đến cd fe ]

B3: Sau khi bạn di chuyển vào trong thư mục fe, bạn cần cài đặt thư viện [ npm i ] 

B4: Cài đặt thự viện xong bạn viết câu lệnh [ npm run dev ] để front-end có thể chạy cổng

+ db.json:
  
B1: Bạn tạo terminal mới bằng di chuyển chuột sang bên phải có nút hình + để tạo terminal mới

B2: Bạn sẽ di chuyển vào trong các thứ mục SU24 trước sau đó đến thư mục fe [ cd SU24 rồi đến cd fe ]

B3: Sau khi bạn di chuyển vào trong thư mục fe, bạn gõ lệnh [ npm run server ] để chạy 

6. Kiểm tra hệ thống

- Sau khi khởi động thành công cả db.json, front-end và back-end, bạn có thể mở trình duyệt và truy cập vào địa chỉ:
  
+ Front-end : [  http://localhost:5173/ ]
  
+ Back-end : [  http://localhost:8080/ ]
  
+ db.json : [ http://localhost:3000/games ]

- Tại đây, bạn có thể trải nghiệm website bán game của mình và thực hiện các thao tác như duyệt game, thêm game vào giỏ hàng, và thanh toán.

7. Đóng góp cho dự án

- Nếu bạn muốn đóng góp vào dự án này, bạn có thể làm theo các bước sau:
  
+ Tạo một fork của repository.
  
+ Thực hiện các thay đổi của bạn trên một branch mới.
  
+ Tạo một pull request để tôi xem xét và hợp nhất thay đổi của bạn.

8. Lời kết

- Nếu bạn gặp bất kỳ vấn đề nào hoặc có bất kỳ ý tưởng nào để cải thiện hệ thống, đừng ngần ngại mở một issue hoặc tạo pull request.
  
- Mọi đóng góp và phản hồi đều rất quý giá đối với sự phát triển của dự án.
  
- Cảm ơn bạn đã quan tâm và sử dụng dự án của nhóm tôi!

Chúc bạn có trải nghiệm tuyệt vời khi sử dụng Website Game Liutiudiu! 🎮✨
>>>>>>> 78e51fe2a85fa82e2e35d46ac0af0be7279048bc
