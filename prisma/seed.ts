import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const productTemplates = [
  { name: 'RTX 4070 Super 12GB', slug: 'rtx-4070-super-12gb', description: 'Grafis 1440p untuk gaming dan kreasi visual', price: 10500000, stock: 8, category: 'VGA', specs: { GPU: 'RTX 4070 Super', VRAM: '12GB GDDR6X', TDP: '220W' } },
  { name: 'Radeon RX 7800 XT 16GB', slug: 'radeon-rx-7800-xt-16gb', description: 'Performa raster kuat dengan memori besar', price: 9200000, stock: 7, category: 'VGA', specs: { GPU: 'RX 7800 XT', VRAM: '16GB GDDR6', TDP: '263W' } },
  { name: 'RTX 4060 8GB Dual Fan', slug: 'rtx-4060-8gb-dual-fan', description: 'GPU efisien untuk gaming 1080p modern', price: 5200000, stock: 12, category: 'VGA', specs: { GPU: 'RTX 4060', VRAM: '8GB GDDR6', TDP: '115W' } },
  { name: 'Intel Core i7-14700K', slug: 'intel-core-i7-14700k', description: 'Performa hybrid untuk editing dan multitasking', price: 6800000, stock: 9, category: 'Processor', specs: { Cores: '20C/28T', Base: '3.4GHz', Socket: 'LGA1700' } },
  { name: 'AMD Ryzen 7 7800X3D', slug: 'amd-ryzen-7-7800x3d', description: 'Processor gaming dengan cache ekstra', price: 6500000, stock: 10, category: 'Processor', specs: { Cores: '8C/16T', Boost: '5.0GHz', Socket: 'AM5' } },
  { name: 'AMD Ryzen 5 7600', slug: 'amd-ryzen-5-7600', description: 'Fondasi AM5 seimbang untuk gaming harian', price: 3300000, stock: 14, category: 'Processor', specs: { Cores: '6C/12T', Boost: '5.1GHz', Socket: 'AM5' } },
  { name: 'Core i5-12400F', slug: 'core-i5-12400f', description: 'Value processor untuk build produktif', price: 2300000, stock: 16, category: 'Processor', specs: { Cores: '6C/12T', Base: '2.5GHz', Socket: 'LGA1700' } },
  { name: 'Vengeance 32GB DDR5 6000', slug: 'vengeance-32gb-ddr5-6000', description: 'Kit memori cepat untuk build generasi baru', price: 1750000, stock: 18, category: 'RAM', specs: { Capacity: '32GB', Speed: '6000MT/s', Type: 'DDR5' } },
  { name: 'Fury Beast 16GB DDR5 5200', slug: 'fury-beast-16gb-ddr5-5200', description: 'Memori DDR5 ringkas untuk kebutuhan harian', price: 950000, stock: 22, category: 'RAM', specs: { Capacity: '16GB', Speed: '5200MT/s', Type: 'DDR5' } },
  { name: 'Ripjaws V 32GB DDR4 3600', slug: 'ripjaws-v-32gb-ddr4-3600', description: 'Upgrade kapasitas untuk workstation DDR4', price: 1350000, stock: 20, category: 'RAM', specs: { Capacity: '32GB', Speed: '3600MT/s', Type: 'DDR4' } },
  { name: 'NVMe Gen4 2TB Performance', slug: 'nvme-gen4-2tb-performance', description: 'Storage cepat untuk project besar dan game', price: 2400000, stock: 11, category: 'Storage', specs: { Capacity: '2TB', Interface: 'PCIe 4.0', Read: '7400MB/s' } },
  { name: 'NVMe Gen3 1TB Essential', slug: 'nvme-gen3-1tb-essential', description: 'Boot drive cepat untuk build seimbang', price: 950000, stock: 25, category: 'Storage', specs: { Capacity: '1TB', Interface: 'PCIe 3.0', Read: '3500MB/s' } },
  { name: 'SATA SSD 1TB Quiet', slug: 'sata-ssd-1tb-quiet', description: 'Upgrade praktis untuk sistem lama', price: 850000, stock: 19, category: 'Storage', specs: { Capacity: '1TB', Interface: 'SATA III', Read: '560MB/s' } },
  { name: 'B550M WiFi Creator', slug: 'b550m-wifi-creator', description: 'Motherboard AM4 dengan konektivitas lengkap', price: 1850000, stock: 8, category: 'Motherboard', specs: { Chipset: 'B550', Socket: 'AM4', Wireless: 'WiFi 6' } },
  { name: 'B650M Pro WiFi', slug: 'b650m-pro-wifi', description: 'Fondasi AM5 modern untuk upgrade panjang', price: 2850000, stock: 7, category: 'Motherboard', specs: { Chipset: 'B650', Socket: 'AM5', Wireless: 'WiFi 6E' } },
  { name: 'Z790 DDR5 Creator', slug: 'z790-ddr5-creator', description: 'Platform Intel premium untuk workstation', price: 4900000, stock: 5, category: 'Motherboard', specs: { Chipset: 'Z790', Socket: 'LGA1700', Memory: 'DDR5' } },
  { name: '650W Gold Modular', slug: '650w-gold-modular', description: 'Daya efisien untuk build performa menengah', price: 1450000, stock: 13, category: 'Power', specs: { Wattage: '650W', Efficiency: '80+ Gold', Modular: 'Full' } },
  { name: '750W Gold ATX 3.0', slug: '750w-gold-atx-3', description: 'Power supply siap untuk GPU generasi baru', price: 1950000, stock: 10, category: 'Power', specs: { Wattage: '750W', Efficiency: '80+ Gold', Standard: 'ATX 3.0' } },
  { name: '850W Platinum Modular', slug: '850w-platinum-modular', description: 'Cadangan daya stabil untuk workstation besar', price: 2850000, stock: 6, category: 'Power', specs: { Wattage: '850W', Efficiency: '80+ Platinum', Modular: 'Full' } },
  { name: '550W Bronze Quiet', slug: '550w-bronze-quiet', description: 'Pilihan tenang untuk PC harian hemat daya', price: 950000, stock: 17, category: 'Power', specs: { Wattage: '550W', Efficiency: '80+ Bronze', Fan: 'Quiet 120mm' } },
]

async function main() {
  const categories = new Map<string, number>()
  for (const name of ['VGA', 'Processor', 'RAM', 'Storage', 'Motherboard', 'Power']) {
    const category = await prisma.category.findFirst({ where: { name } }) ?? await prisma.category.create({ data: { name } })
    categories.set(name, category.id)
  }

  await prisma.product.upsert({ where: { slug: 'rtx-4060-ti-16gb' }, update: { imageUrl: '' }, create: { name: 'RTX 4060 Ti 16GB', slug: 'rtx-4060-ti-16gb', description: 'Performa 1440p gaming terbaik di kelasnya', price: 7500000, stock: 15, imageUrl: '', specs: { GPU: 'RTX 4060 Ti', VRAM: '16GB GDDR6', TDP: '165W' }, categoryId: categories.get('VGA')! } })
  await prisma.product.upsert({ where: { slug: 'i5-14600k' }, update: { imageUrl: '' }, create: { name: 'Intel Core i5-14600K', slug: 'i5-14600k', description: '14 Core untuk gaming dan editing', price: 5200000, stock: 20, imageUrl: '', specs: { Cores: '14C/20T', Base: '3.5GHz', Socket: 'LGA1700' }, categoryId: categories.get('Processor')! } })

  for (const product of productTemplates) {
    const { category, ...productData } = product
    await prisma.product.upsert({ where: { slug: product.slug }, update: { ...productData, imageUrl: '', categoryId: categories.get(category)! }, create: { ...productData, imageUrl: '', categoryId: categories.get(category)! } })
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
