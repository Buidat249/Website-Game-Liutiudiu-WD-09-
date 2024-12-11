import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Fanpage = () => {
  return (
    <div className="flex-1 pt-6 pb-6 pr-0 pl-6 bg-gray-100  overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-md ml-5 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hệ thống Fanpage chính thức
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Dưới đây là thông tin các Fanpage chính thức của Liutiudiu Shop:
        </p>
        <ul className="space-y-4">
          <li>
            <strong>1. Divine Shop - Game bản quyền</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Liutitudiu Shop - Game bản quyền
            </a>
          </li>
          <li>
            <strong>2. Divine Shop - Xem phim bản quyền</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Liutitudiu Shop - Xem phim bản quyền
            </a>
          </li>
          <li>
            <strong>3. Divine Shop - Nghe nhạc bản quyền</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Divine Shop - Nghe nhạc bản quyền
            </a>
          </li>
          <li>
            <strong>4. Divine Shop - Phần mềm bản quyền</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Divine Shop - Phần mềm bản quyền
            </a>
          </li>
          <li>
            <strong>5. Divine News</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Divine News
            </a>
          </li>
          <li>
            <strong>6. Đảo Divine</strong> <br />
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Đảo Divine
            </a>
          </li>
        </ul>
        <div className="flex flex-col md:flex-row mt-6 gap-2 max-w-3xl mx-auto page-api-block:ml-0">
          <Link
            className="text-sm p-2.5 flex gap-4 flex-1 flex-row-reverse items-center pl-4 border border-dark/3 rounded straight-corners:rounded-none dark:border-light/2 text-pretty md:p-4 md:text-base hover:border-blue-500"
            to="/contact/introduce"
          >
            <span className="flex flex-col flex-1 text-right">
              <span className="text-xs">Previous</span>
              <span className="text-dark dark:text-light/6 line-clamp-2">
                Giới thiệu Liutiudiu Shop
              </span>
            </span>
            <svg
              className="gb-icon hidden size-4 text-dark/5 dark:text-light/4 md:block"
              style={{
                maskImage:
                  'url("https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/chevron-left.svg?v=2&token=a463935e93")',
                maskRepeat: "no-repeat",
                maskPosition: "center center",
              }}
            ></svg>
          </Link>
          <a
            className="text-sm p-2.5 flex gap-4 flex-1 flex-row items-center pr-4 border border-dark/3 rounded straight-corners:rounded-none dark:border-light/2 text-pretty md:p-4 md:text-base hover:border-blue-500"
            href="#"
          >
            <span className="flex flex-col flex-1">
              <span className="text-xs">Next</span>
              <span className="text-dark dark:text-light/6 line-clamp-2">
                Tổng quan website
              </span>
            </span>
            <svg
              className="gb-icon hidden size-4 text-dark/5 dark:text-light/4 md:block"
              style={{
                maskImage:
                  'url("https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/chevron-right.svg?v=2&token=a463935e93")',
                maskRepeat: "no-repeat",
                maskPosition: "center center",
              }}
            ></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Fanpage;
