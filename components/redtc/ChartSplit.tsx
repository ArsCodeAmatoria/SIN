"use client";

import { useEffect, useState, type ReactNode } from "react";

function ChartIframe({
  pdfHref,
  title,
  large,
}: {
  pdfHref: string;
  title: string;
  large?: boolean;
}) {
  return (
    <iframe
      className={`redtc-chart-frame${large ? " redtc-chart-frame-lg" : ""}`}
      src={pdfHref}
      title={title}
    />
  );
}

export function useChartViewer(pdfHref: string, title: string) {
  const [enlarge, setEnlarge] = useState(false);

  useEffect(() => {
    setEnlarge(false);
  }, [pdfHref]);

  const sheet = enlarge ? (
    <div className="redtc-sheet" role="dialog" aria-label={title}>
      <button
        type="button"
        className="redtc-sheet-back"
        aria-label="Close chart"
        onClick={() => setEnlarge(false)}
      />
      <div className="redtc-sheet-panel redtc-chart-sheet">
        <div className="redtc-sheet-head">
          <p className="mono steel">{title}</p>
          <button type="button" className="btn btn-ghost" onClick={() => setEnlarge(false)}>
            Close
          </button>
        </div>
        <ChartIframe pdfHref={pdfHref} title={title} large />
        <p className="steel mt">Pinch-zoom in the viewer, or open the PDF in a new tab.</p>
      </div>
    </div>
  ) : null;

  const frame = <ChartIframe pdfHref={pdfHref} title={title} />;

  return { enlarge, setEnlarge, frame, sheet };
}

export function ChartSplit({
  pdfHref,
  title,
  children,
  tools = true,
}: {
  pdfHref: string;
  title: string;
  children: ReactNode;
  tools?: boolean;
}) {
  const { frame, sheet, setEnlarge } = useChartViewer(pdfHref, title);

  return (
    <>
      {sheet}
      <div className="redtc-chart-split">
        <div className="redtc-chart-pane">
          {tools ? (
            <div className="redtc-sit-tools">
              <a className="btn btn-solid" href={pdfHref} target="_blank" rel="noopener noreferrer">
                Open chart
              </a>
              <button type="button" className="btn btn-ghost" onClick={() => setEnlarge(true)}>
                Enlarge
              </button>
            </div>
          ) : null}
          {frame}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
