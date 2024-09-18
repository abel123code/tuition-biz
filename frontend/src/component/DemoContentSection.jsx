import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import PDFReader from './PDFReader'

const DemoContentSection = ({title, type, pdfUrl}) => {
  return (
    <section className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col min-h-[500px]">
      <h2 className="text-2xl font-semibold mb-4 flex justify-center">{title}</h2>
      <div className="flex-1">
        <PDFReader contentURL={pdfUrl} />
      </div>
    </section>
  )
}

export default DemoContentSection
