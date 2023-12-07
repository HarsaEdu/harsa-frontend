const subscriptionData = [
    { 
        id: 1, 
        name: 'Paket  regular 1', 
        durasi: '1 bulan', 
        Harga: 'Rp.25000', 
    },
    { 
        id: 2, 
        name: 'Paket regular 2', 
        durasi: '3 bulan', 
        Harga: 'Rp.75000', 
    },
    { 
        id: 3, 
        name: 'Paket Regular 3', 
        durasi: '6 bulan', 
        Harga: 'Rp.150000', 
    },
    { 
        id: 4, 
        name: 'Paket Platinum', 
        durasi: '1 tahun', 
        Harga: 'Rp.295000', 
    },
    { 
        id: 5, 
        name: 'Paket Gold ', 
        durasi: '2 tahun', 
        Harga: 'Rp.550000', 
    },
    { 
        id: 6, 
        name: 'Paket Mingguan', 
        durasi: '7 hari', 
        Harga: 'Rp.15000', 
    },
];


for (let i = 7; i <= 25; i++) {
    subscriptionData.push({
        id: i,
        name: i <= 6 ? `Paket Regular ${i}` : 'Paket Mingguan',
        durasi: i % 3 === 0 ? '1 bulan' : (i % 3 === 1 ? '3 bulan' : '6 bulan'),
        Harga: i % 3 === 0 ? 'Rp.25000' : (i % 3 === 1 ? 'Rp.75000' : 'Rp.150000'),
    });
}

export default subscriptionData;
