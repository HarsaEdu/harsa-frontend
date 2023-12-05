const instructorData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', class: 'Class A' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', class: 'Class B' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', class: 'Class C' },
    // Tambahkan data lainnya sesuai kebutuhan
    // ...
  ];
  
  // Menambahkan data lebih dari 20
  for (let i = 4; i <= 25; i++) {
    instructorData.push({
      id: i,
      name: `Instructor ${i}`,
      email: `instructor${i}@example.com`,
      class: `Class ${String.fromCharCode(65 + (i % 3))}`, // Class A, B, C secara bergantian
    });
  }
  
  export default instructorData;
  