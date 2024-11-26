'use client';

import { FC, forwardRef, useRef } from 'react';
import Image from 'next/image';
import { jsPDF as JsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Flex, Text } from '@mantine/core';

import BookingItemDetailButton from '@/components/material/buttons/BookingItemDetailButton/BookingItemDetailButton';

import PrintIcon from '@/components/material/icons/Print.icon';
import ShareIcon from '@/components/material/icons/Share.icon';

import { IBookingDetail } from '@/data/server_requests/dashboard_page/booking_details';

import styles from './BookingItemDetailTools.module.css';

export interface BookingDetailToolsProps {
  data: IBookingDetail;
}

const BookingDetailTools: FC<BookingDetailToolsProps> = ({ data }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (content) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const styles_Html = document.querySelectorAll('style, link[rel="stylesheet"]');
        const printStyles = Array.from(styles_Html)
          .map((style) => style.outerHTML)
          .join('');
        printWindow.document.write(printStyles);
        printWindow.document.write(content.outerHTML);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadAndSharePDF = async () => {
    const input = pdfContentRef.current;

    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new JsPDF();
    const imgWidth = 100;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfBlob = pdf.output('blob');

    const sharePdf = async () => {
      const file = new File([pdfBlob], 'download.pdf', { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Share PDF',
          text: 'Here is the PDF I wanted to share!',
        });
      }
    };
    await sharePdf();
  };

  return (
    <Flex>
      <Flex
        className={styles.container}
        gap="sm"
        justify="flex-end"
        aria-label="booking-item-detail-tools"
      >
        <Flex onClick={handleDownloadAndSharePDF} className={styles.iconContainer}>
          <ShareIcon />
          <PDFContent ref={pdfContentRef} />
        </Flex>
        <Flex className={styles.iconContainer} onClick={handlePrint}>
          <PrintIcon />
        </Flex>
      </Flex>
      <PrintableComponent ref={printRef} data={data} />
    </Flex>
  );
};

const PrintableComponent = forwardRef<HTMLDivElement, { data: IBookingDetail }>(
  ({ data }, printRef) => (
    <Flex className={styles.mainContainer}>
      <Flex className={styles.containerCard} direction="column" align="center" ref={printRef}>
        <Flex className={styles.containerContent} direction="column" align="center">
          <Flex direction="column" align="center" className={styles.head}>
            <Image
              src="/assets/images/booking-printCard/logo.png"
              width={76}
              height={76}
              alt="logo"
            />
            <Flex direction="column" align="center" gap={12}>
              <Text className={styles.firstText}>[Shop name]</Text>
              <Text className={styles.secondText}>[Shop name]</Text>
              <Text className={styles.thirdText}>[Shop name]</Text>
            </Flex>
            <Flex className={styles.line1}></Flex>
          </Flex>

          <Flex className={styles.head} direction="column">
            <Flex direction="column" className={styles.body}>
              <Text className={styles.forthText}>Transaction Detail</Text>
              <Flex direction="column" gap={8} justify="center" align="center">
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Date Time</Text>
                  <Text className={styles.bodyItem_text_right}>
                    {data.bookingDate.slice(0, 16)}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Transaction No.</Text>
                  <Text className={styles.bodyItem_text_right}>146461646444616564</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>TID</Text>
                  <Text className={styles.bodyItem_text_right}>****8632</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>MID</Text>
                  <Text className={styles.bodyItem_text_right}>**16161</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>AID</Text>
                  <Text className={styles.bodyItem_text_right}>A00000668</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Auth Code</Text>
                  <Text className={styles.bodyItem_text_right}>11 - T741</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex className={styles.line1}></Flex>
          </Flex>

          <Flex className={styles.head} direction="column">
            <Flex direction="column" className={styles.body}>
              <Flex direction="column" gap={4} justify="center" align="center">
                <Flex justify="space-between" align="center" className={styles.bodyItem} mb="16">
                  <Text className={styles.bodyItem_headText_top}>Total</Text>
                  <Text className={styles.bodyItem_headText_bootom}>£103.40</Text>
                </Flex>

                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Card type </Text>
                  <Text className={styles.bodyItem_text_right}>Mastercard</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Card number</Text>
                  <Text className={styles.bodyItem_text_right}>**** **** 5647 </Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Expired date</Text>
                  <Text className={styles.bodyItem_text_right}>06/05/2026</Text>
                </Flex>
                <Flex justify="space-between" align="center" className={styles.bodyItem}>
                  <Text className={styles.bodyItem_text_left}>Terminal No.</Text>
                  <Text className={styles.bodyItem_text_right}>9698469797416879</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="end" className={styles.btn}>
          <Flex className={styles.btn_content}>
            <BookingItemDetailButton />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
);

const PDFContent = forwardRef<HTMLDivElement>((props, ref) => (
  <Flex className={styles.mainContainer}>
    <Flex className={styles.containerCard} direction="column" align="center" ref={ref}>
      <Flex className={styles.containerContent} direction="column" align="center">
        <Flex direction="column" align="center" className={styles.head}>
          <Image
            src="/assets/images/booking-printCard/logo.png"
            width={76}
            height={76}
            alt="logo"
          />
          <Flex direction="column" align="center" gap={12}>
            <Text className={styles.firstText}>[Shop name]</Text>
            <Text className={styles.secondText}>[Shop name]</Text>
            <Text className={styles.thirdText}>[Shop name]</Text>
          </Flex>
          <Flex className={styles.line1}></Flex>
        </Flex>

        <Flex className={styles.head} direction="column">
          <Flex direction="column" className={styles.body}>
            <Text className={styles.forthText}>Transaction Detail</Text>
            <Flex direction="column" gap={8} justify="center" align="center">
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Date Time</Text>
                <Text className={styles.bodyItem_text_right}>25/05/2024 19:32</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Transaction No.</Text>
                <Text className={styles.bodyItem_text_right}>146461646444616564</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>TID</Text>
                <Text className={styles.bodyItem_text_right}>****8632</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>MID</Text>
                <Text className={styles.bodyItem_text_right}>**16161</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>AID</Text>
                <Text className={styles.bodyItem_text_right}>A00000668</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Auth Code</Text>
                <Text className={styles.bodyItem_text_right}>11 - T741</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex className={styles.line1}></Flex>
        </Flex>

        <Flex className={styles.head} direction="column">
          <Flex direction="column" className={styles.body}>
            <Flex direction="column" gap={4} justify="center" align="center">
              <Flex justify="space-between" align="center" className={styles.bodyItem} mb="16">
                <Text className={styles.bodyItem_headText_top}>Total</Text>
                <Text className={styles.bodyItem_headText_bootom}>£103.40</Text>
              </Flex>

              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Card type </Text>
                <Text className={styles.bodyItem_text_right}>Mastercard</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Card number</Text>
                <Text className={styles.bodyItem_text_right}>**** **** 5647 </Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Expired date</Text>
                <Text className={styles.bodyItem_text_right}>06/05/2026</Text>
              </Flex>
              <Flex justify="space-between" align="center" className={styles.bodyItem}>
                <Text className={styles.bodyItem_text_left}>Terminal No.</Text>
                <Text className={styles.bodyItem_text_right}>9698469797416879</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex align="end" className={styles.btn}>
        <Flex className={styles.btn_content}>
          <BookingItemDetailButton />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
));

export default BookingDetailTools;
