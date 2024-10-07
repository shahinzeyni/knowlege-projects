import React from "react";

export default function ArticleBox() {
  return (
    <div className="articles__item">
      <img
        src="../../img/store/products/product-img-1.jpg"
        alt="product-img-1"
        className="articles__img"
      />
      <div className="articles__details w-100">
        <div className="articles__info">
          <h3 className="articles__name">دوره متخصص ریداکس</h3>
          <p className="articles__short-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            ullam voluptates impedit incidunt
          </p>
        </div>
        <div className="articles__tags">
          <div className="articles__boxes">
            <div className="articles__category-box d-flex gap-2 align-items-center">
              <span className="fa fa-tags" />
              <p className="articles__tag-text articles__category my-0">
                <span>دسته بندی :</span>
                <span className="articles__category-value">فرانت‌اند</span>
              </p>
            </div>
            <div className="articles__visited-box d-flex gap-2 align-items-center">
              <span className="fa fa-users" />
              <p className="articles__tag-text articles__visited my-0">
                <span>تعداد بازدید :</span>
                <span className="articles__visited-count">23</span>
              </p>
            </div>
          </div>
          <div className="articles__btns">
            <button className="op-btn btn btn-danger btn-lg">حذف</button>
            <button className="op-btn btn btn-info btn-lg">ویرایش</button>
          </div>
        </div>
      </div>
    </div>
  );
}
