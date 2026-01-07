import React from 'react';

export function CrtOverlay() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />
    </>
  );
}
