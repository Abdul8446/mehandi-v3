import('bcryptjs').then(bcrypt => bcrypt.hash('admin123', 10).then(console.log));
