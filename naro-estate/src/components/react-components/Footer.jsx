import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-muted py-3">
      {/* Top separating line */}
      <hr className=" border-t border-slate-200 mb-4" />

      <div className="container mx-auto px-4 text-center text-primary font-semibold">
        <p className="text-sm">
          © {new Date().getFullYear()} NaroEstate. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
