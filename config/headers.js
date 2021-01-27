module.exports = [
  {
    source: '/app/:path*/',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
    ],
  },
];
