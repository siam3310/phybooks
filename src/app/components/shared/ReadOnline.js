"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs, Outline } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Zoom,
  Virtual,
  Keyboard,
  Pagination,
  Navigation,
} from "swiper/modules";
import SkeletonReader from "./SkeletonReader";

import styles from "@/app/styles/components/ReadOnline.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/navigation";
import ListIcon from "../icons/ListIcon";
import Toast from "./Toast";
import MinimizeIcon from "../icons/MinimizeIcon";
import ExpandIcon from "../icons/ExpandIcon";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const resizeObserverOptions = {};

export default function ReadOnline({ file, isFullView, parentCallback }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [swiperRef, setSwiperRef] = useState(null);
  const [sliderView, setSliderView] = useState(1); // either 1 or 2
  const [showSliderIndex, setShowSliderIndex] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showFullView, setShowFullView] = useState(isFullView);
  const closeDelay = 3000;

  // Ref for checking if it's the initial load
  const initialLoad = useRef(true);

  // Load last visited page from localStorage
  useEffect(() => {
    const lastVisitedPage = localStorage.getItem(`lastVisitedPage_${file}`);
    if (lastVisitedPage && lastVisitedPage.isNumeric()) {
      setPageNumber(parseInt(lastVisitedPage));
      // If swiperRef is available, slide to the last visited page
      if (swiperRef) {
        swiperRef.slideTo(parseInt(lastVisitedPage) - 1, 0);
      }
    }
  }, [file, swiperRef]);

  // Save current page to localStorage
  useEffect(() => {
    if (!initialLoad.current)
      localStorage.setItem(
        `lastVisitedPage_${file}`,
        JSON.stringify(pageNumber)
      );
    else initialLoad.current = false;
  }, [pageNumber, file]);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), closeDelay);
    return () => clearTimeout(timer);
  }, [showToast]);

  const MAX_WIDTH = 800;
  const BUFFER_WIDTH = 51; // padding and stuff
  const PDF_BREAKPOINT = 600 - BUFFER_WIDTH; // 600px vw

  const pageWidth = containerWidth
    ? Math.min(containerWidth, MAX_WIDTH)
    : MAX_WIDTH;

  const onResize = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry) {
        setContainerWidth(entry.contentRect.width);
        if (entry.contentRect.width > PDF_BREAKPOINT) setSliderView(2);
        else setSliderView(1);
        parentCallback(showFullView);
      }
    },
    [PDF_BREAKPOINT, showFullView, parentCallback]
  );

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: totalNumPages }) {
    setNumPages(totalNumPages);
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) setPageNumber(parseInt(lastVisitedPage));
    else setPageNumber(1);
    setIsLoading(false);
  }

  // navigation

  const slideTo = (index) => {
    setPageNumber(index);
    swiperRef.slideTo(index - 1, 0);
  };

  const changePage = (offset) => {
    const newPageNumber = pageNumber + offset;
    if (newPageNumber <= numPages && newPageNumber > 0) {
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
      slideTo(pageNumber + offset);
    }
  };

  const previousPage = () => changePage(-1 * sliderView);
  const nextPage = () => changePage(1 * sliderView);

  const handleSlideChange = (swiper) => setPageNumber(swiper.activeIndex + 1);

  const onIndexNav = ({ pageNumber: indexPageNumber }) => {
    setPageNumber(indexPageNumber);
    slideTo(indexPageNumber);
    setShowSliderIndex(false);
  };

  return (
    <div className={styles.documentContainer} ref={setContainerRef}>
      {isLoading && <SkeletonReader />}

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className={styles.document}
        onLoadStart={() => setIsLoading(true)}
        onLoadError={() => {
          setIsLoading(false);
          setShowToast(true);
        }}
      >
        <div
          className={`${styles.TOC} ${isFullView ? styles.TOC__fullView : ""}`}
          style={{
            maxHeight:
              sliderView === 1 ? pageWidth * 1.41 : (pageWidth * 1.41) / 2,
          }}
        >
          <h2 className={styles.index__title}>Index</h2>
          <Outline onItemClick={onIndexNav} className={styles.index} />
        </div>

        <div className={styles.page__section}>
          <div
            className={styles.page__backdrop}
            style={{
              width: pageWidth,
              height:
                sliderView === 1 ? pageWidth * 1.42 : (pageWidth * 1.42) / 2,
            }}
          >
            <Swiper
              style={{
                "--swiper-navigation-color": "var(--accents-7)",
                "--swiper-pagination-color": "var(--cyan)",
              }}
              zoom={true}
              ref={swiperRef}
              navigation={true}
              onSlideChange={handleSlideChange}
              centeredSlides={false}
              grabCursor={true}
              keyboard={{ enabled: true }}
              pagination={{ type: "progressbar", clickable: true }}
              slidesPerView={sliderView}
              slidesPerGroup={sliderView}
              modules={[Zoom, Virtual, Navigation, Pagination, Keyboard]}
              className="mySwiper"
              onSwiper={setSwiperRef}
              virtual
            >
              <button
                className={styles.mySwiper__index__fullViewBtn}
                onClick={() => setShowFullView(!showFullView)}
              >
                {!showFullView ? <ExpandIcon /> : <MinimizeIcon />}
              </button>
              {[...Array(numPages).keys()].map((pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <div className="swiper-zoom-container">
                    <Page
                      pageNumber={pageIndex + 1}
                      width={sliderView === 1 ? pageWidth : pageWidth / 2}
                      className={styles.page}
                    />
                  </div>
                </SwiperSlide>
              ))}

              <div
                className={styles.mySwiper__indexContainer}
                style={{ visibility: showSliderIndex ? "visible" : "hidden" }}
              >
                <h3>Table of contents</h3>
                <Outline
                  onItemClick={onIndexNav}
                  className={`${styles.mySwiper__index} ${styles.index}`}
                />
              </div>
              <button
                className={styles.mySwiper__index__toggleBtn}
                onClick={() => setShowSliderIndex(!showSliderIndex)}
              >
                <ListIcon className={styles.mySwiper__index__toggleIcon} />
              </button>
            </Swiper>
          </div>

          <div>
            <p className={styles.pageNumber}>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>

            <div className={styles.navBtns}>
              <button
                disabled={pageNumber + -1 * sliderView < 1}
                onClick={previousPage}
                className={styles.nav__previous}
              >
                Previous
              </button>
              <button
                disabled={pageNumber + 1 * sliderView > numPages}
                onClick={nextPage}
                className={styles.nav__next}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Document>

      {showToast && (
        <Toast
          info="Error loading pdf!"
          state="Error"
          onClose={() => setShowToast(false)}
          show={showToast}
        />
      )}
    </div>
  );
}
