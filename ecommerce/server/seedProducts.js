require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [
  // ─── FASHION (25) ───
  { name: "Men's Classic Oxford Shirt", price: 1299, category: "Fashion", description: "Premium cotton Oxford shirt with button-down collar. Perfect for formal and casual occasions. Available in multiple colors.", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80" },
  { name: "Women's Floral Wrap Dress", price: 1899, category: "Fashion", description: "Elegant floral wrap dress with V-neck and flowy silhouette. Lightweight fabric perfect for summer.", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80" },
  { name: "Men's Slim Fit Chinos", price: 1599, category: "Fashion", description: "Stretch slim fit chinos with a modern tapered leg. Comfortable all-day wear with versatile styling.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80" },
  { name: "Women's Crop Hoodie", price: 999, category: "Fashion", description: "Soft fleece crop hoodie with front pocket. Cozy and trendy for casual everyday wear.", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80" },
  { name: "Men's Leather Jacket", price: 4999, category: "Fashion", description: "Genuine leather biker jacket with zippered pockets. A timeless wardrobe essential.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80" },
  { name: "Women's High Waist Jeans", price: 1799, category: "Fashion", description: "Stretch high-rise skinny jeans with ankle length. Flattering fit with a hint of elastane for comfort.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80" },
  { name: "Men's Linen Kurta", price: 1199, category: "Fashion", description: "Breathable linen kurta with classic print. Perfect for festive occasions and casual outings.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4571?w=400&q=80" },
  { name: "Women's Palazzo Pants", price: 899, category: "Fashion", description: "Flowy palazzo pants with elastic waistband. Comfortable and stylish for all-day wear.", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80" },
  { name: "Men's Graphic Tee", price: 599, category: "Fashion", description: "100% cotton round-neck graphic tee with artistic print. Pre-shrunk and long lasting color.", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80" },
  { name: "Women's Blazer", price: 2999, category: "Fashion", description: "Structured single-button blazer in premium fabric. Elevate any outfit from casual to formal instantly.", image: "https://images.unsplash.com/photo-1594938374182-a55e9cb979e9?w=400&q=80" },
  { name: "Men's Polo T-Shirt", price: 799, category: "Fashion", description: "Classic pique polo shirt with ribbed collar and cuffs. Versatile and comfortable for any occasion.", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80" },
  { name: "Women's Satin Saree", price: 3499, category: "Fashion", description: "Luxurious satin saree with zari border. Perfect for weddings and festive celebrations.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { name: "Men's Denim Jacket", price: 2499, category: "Fashion", description: "Classic washed denim jacket with chest pockets. A versatile layering piece for all seasons.", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=400&q=80" },
  { name: "Women's Anarkali Suit", price: 2799, category: "Fashion", description: "Embroidered Anarkali suit with dupatta. Crafted from premium fabric with intricate detailing.", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80" },
  { name: "Men's Formal Trousers", price: 1499, category: "Fashion", description: "Premium wool-blend formal trousers with straight cut. Ideal for office and formal events.", image: "https://images.unsplash.com/photo-1594938374182-a55e9cb979e9?w=400&q=80" },
  { name: "Women's Summer Top", price: 699, category: "Fashion", description: "Lightweight breezy top with floral embroidery. Perfect for summer days and casual outings.", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&q=80" },
  { name: "Men's Jogger Pants", price: 1099, category: "Fashion", description: "Comfortable jogger pants with drawstring waist and tapered fit. Great for gym and casual wear.", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80" },
  { name: "Women's Maxi Skirt", price: 1299, category: "Fashion", description: "Flowing A-line maxi skirt with elastic waistband. Effortlessly chic for all occasions.", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80" },
  { name: "Men's Nehru Jacket", price: 2199, category: "Fashion", description: "Classic Nehru collar jacket in silk blend. Perfect for festive occasions and traditional events.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80" },
  { name: "Women's Denim Shorts", price: 999, category: "Fashion", description: "Distressed high-waist denim shorts with rolled cuffs. Casual and trendy summer essential.", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80" },
  { name: "Men's Sweatshirt", price: 1199, category: "Fashion", description: "Heavyweight fleece sweatshirt with ribbed cuffs. Cozy and warm for cooler days.", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80" },
  { name: "Women's Kurti Set", price: 1599, category: "Fashion", description: "Printed cotton kurti with matching palazzo. Comfortable ethnic wear for daily use.", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80" },
  { name: "Men's Cargo Shorts", price: 1099, category: "Fashion", description: "Multi-pocket cargo shorts with adjustable waistband. Practical and stylish for outdoor activities.", image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&q=80" },
  { name: "Women's Cardigan", price: 1399, category: "Fashion", description: "Soft knit open-front cardigan with long sleeves. Perfect layering piece for transitional weather.", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80" },
  { name: "Men's Striped Formal Shirt", price: 1099, category: "Fashion", description: "Classic striped formal shirt with premium cotton fabric. Crisp and professional look for office wear.", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=400&q=80" },

  // ─── ELECTRONICS (20) ───
  { name: "Wireless Bluetooth Earbuds", price: 2999, category: "Electronics", description: "True wireless earbuds with active noise cancellation, 30-hour battery life, and IPX5 water resistance.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
  { name: "Mechanical Gaming Keyboard", price: 4499, category: "Electronics", description: "RGB mechanical keyboard with tactile blue switches, anti-ghosting, and USB-C connectivity.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
  { name: "4K Webcam", price: 5999, category: "Electronics", description: "Ultra HD 4K webcam with autofocus, noise-cancelling mic, and wide-angle lens. Perfect for streaming.", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
  { name: "Portable Power Bank 20000mAh", price: 1999, category: "Electronics", description: "High-capacity power bank with 65W fast charging, dual USB-C ports, and LED display.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80" },
  { name: "Smart LED Strip Lights", price: 1299, category: "Electronics", description: "WiFi-enabled RGB LED strip with app control, voice assistant support, and music sync mode.", image: "https://images.unsplash.com/photo-1616587226157-48e49175ee20?w=400&q=80" },
  { name: "USB-C Hub 7-in-1", price: 2499, category: "Electronics", description: "Multiport USB-C hub with HDMI 4K, 3 USB-A ports, SD card reader, and 100W PD charging.", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80" },
  { name: "Noise Cancelling Headphones", price: 7999, category: "Electronics", description: "Over-ear headphones with active noise cancellation, 40-hour playtime, and premium sound quality.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { name: "Smart Home Speaker", price: 3499, category: "Electronics", description: "360° surround sound smart speaker with voice assistant, multi-room audio, and premium bass.", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80" },
  { name: "Wireless Charging Pad", price: 1499, category: "Electronics", description: "15W fast wireless charging pad compatible with all Qi-enabled devices. Slim and lightweight design.", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80" },
  { name: "Mini Projector", price: 8999, category: "Electronics", description: "Portable mini projector with 1080p support, built-in speakers, and HDMI/USB connectivity. 120-inch display.", image: "https://images.unsplash.com/photo-1626379801357-537572d1fc5a?w=400&q=80" },
  { name: "Gaming Mouse", price: 2999, category: "Electronics", description: "Ergonomic gaming mouse with 16000 DPI sensor, 7 programmable buttons, and RGB lighting.", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80" },
  { name: "Smart Doorbell Camera", price: 4999, category: "Electronics", description: "HD video doorbell with motion detection, two-way audio, night vision, and cloud storage.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { name: "Laptop Stand Adjustable", price: 1799, category: "Electronics", description: "Aluminium adjustable laptop stand with 6 height levels and foldable design for portability.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
  { name: "Digital Drawing Tablet", price: 5499, category: "Electronics", description: "Professional graphics tablet with 8192 pressure levels, tilt support, and 10 express keys.", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80" },
  { name: "Portable Bluetooth Speaker", price: 2499, category: "Electronics", description: "Waterproof portable speaker with 360° sound, 20-hour battery, and stereo pairing capability.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
  { name: "Smart Watch Fitness Tracker", price: 3999, category: "Electronics", description: "Feature-rich smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { name: "Mechanical Numpad", price: 1999, category: "Electronics", description: "Compact mechanical numpad with RGB backlighting and hot-swappable switches. Great for accountants.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
  { name: "Ring Light 18 inch", price: 3299, category: "Electronics", description: "Professional 18-inch LED ring light with tripod stand, phone holder, and 3 color temperatures.", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&q=80" },
  { name: "WiFi Range Extender", price: 1899, category: "Electronics", description: "Dual-band WiFi extender with AC1200 speed, 4 antennas, and easy WPS setup for whole-home coverage.", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80" },
  { name: "Action Camera 4K", price: 9999, category: "Electronics", description: "Waterproof 4K action camera with image stabilization, WiFi sharing, and wide-angle lens.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" },

  // ─── SHOES (20) ───
  { name: "Men's Running Shoes", price: 2999, category: "Shoes", description: "Lightweight mesh running shoes with responsive cushioning and breathable upper. Perfect for daily runs.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Women's Block Heel Sandals", price: 1799, category: "Shoes", description: "Comfortable block heel sandals with cushioned footbed and adjustable ankle strap. Office to evening.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" },
  { name: "Men's Leather Derby Shoes", price: 3999, category: "Shoes", description: "Classic leather derby shoes with Goodyear welt construction. Timeless formal footwear.", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80" },
  { name: "Women's White Sneakers", price: 1999, category: "Shoes", description: "Minimalist white leather sneakers with cushioned insole. The ultimate everyday shoe.", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80" },
  { name: "Men's Hiking Boots", price: 4499, category: "Shoes", description: "Waterproof hiking boots with aggressive rubber outsole and ankle support. Built for trails.", image: "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?w=400&q=80" },
  { name: "Women's Ballet Flats", price: 1299, category: "Shoes", description: "Classic pointed-toe ballet flats in faux leather. Comfortable slip-on design for everyday wear.", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80" },
  { name: "Men's Canvas Sneakers", price: 1499, category: "Shoes", description: "Classic low-top canvas sneakers with rubber sole. Timeless casual footwear in multiple colors.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80" },
  { name: "Women's Stiletto Heels", price: 2499, category: "Shoes", description: "Elegant pointed-toe stiletto heels in premium faux leather. Perfect for formal events.", image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&q=80" },
  { name: "Men's Slip-On Loafers", price: 2199, category: "Shoes", description: "Premium suede slip-on loafers with metal bit detail. Smart casual style for any occasion.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80" },
  { name: "Women's Ankle Boots", price: 2799, category: "Shoes", description: "Chelsea ankle boots with elastic side panels and block heel. Perfect for all seasons.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
  { name: "Men's Sport Sandals", price: 1199, category: "Shoes", description: "Durable sport sandals with adjustable straps and contoured footbed. Great for outdoor activities.", image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&q=80" },
  { name: "Women's Platform Sneakers", price: 2299, category: "Shoes", description: "Chunky platform sneakers with thick rubber sole. Trendy and comfortable for streetwear looks.", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80" },
  { name: "Men's Chelsea Boots", price: 3499, category: "Shoes", description: "Genuine leather Chelsea boots with elastic gussets and stacked heel. Smart and stylish.", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80" },
  { name: "Women's Mules", price: 1599, category: "Shoes", description: "Backless slip-on mules with square toe and kitten heel. Sophisticated and easy to wear.", image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&q=80" },
  { name: "Men's Basketball Shoes", price: 4999, category: "Shoes", description: "High-top basketball shoes with cushioned midsole and ankle strap. Superior court performance.", image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400&q=80" },
  { name: "Women's Kolhapuri Chappals", price: 899, category: "Shoes", description: "Traditional hand-crafted Kolhapuri chappals with genuine leather. Cultural heritage meets comfort.", image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&q=80" },
  { name: "Men's Oxford Brogues", price: 3299, category: "Shoes", description: "Classic leather brogues with decorative perforations. Polished formal shoe for special occasions.", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80" },
  { name: "Women's Running Trainers", price: 2699, category: "Shoes", description: "Lightweight running trainers with energy-return foam and breathable mesh upper.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Men's Flip Flops", price: 499, category: "Shoes", description: "Lightweight EVA flip flops with contoured footbed and non-slip sole. Perfect for beach and home.", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80" },
  { name: "Women's Wedge Espadrilles", price: 1899, category: "Shoes", description: "Canvas espadrille wedges with jute platform and ankle tie. Casual summer footwear.", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80" },

  // ─── WATCHES (15) ───
  { name: "Men's Chronograph Watch", price: 8999, category: "Watches", description: "Stainless steel chronograph with mineral glass, 100m water resistance, and tachymeter bezel.", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&q=80" },
  { name: "Women's Rose Gold Watch", price: 5999, category: "Watches", description: "Elegant rose gold-tone watch with crystal-studded bezel and mesh bracelet. Timeless femininity.", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&q=80" },
  { name: "Men's Dive Watch", price: 12999, category: "Watches", description: "Professional dive watch with 200m water resistance, unidirectional bezel, and luminous hands.", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80" },
  { name: "Women's Minimalist Watch", price: 3499, category: "Watches", description: "Ultra-slim minimalist watch with leather strap and clean dial. Understated elegance.", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80" },
  { name: "Men's Automatic Watch", price: 15999, category: "Watches", description: "Self-winding automatic movement with exhibition caseback, sapphire crystal, and leather strap.", image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&q=80" },
  { name: "Women's Smart Watch", price: 7999, category: "Watches", description: "Fashion smartwatch with health monitoring, notifications, GPS, and interchangeable bands.", image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80" },
  { name: "Men's Field Watch", price: 6499, category: "Watches", description: "Rugged field watch with scratch-resistant mineral glass, canvas strap, and luminous numerals.", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80" },
  { name: "Women's Ceramic Watch", price: 9999, category: "Watches", description: "Luxury ceramic watch with diamond-set bezel, mother-of-pearl dial, and scratch-proof case.", image: "https://images.unsplash.com/photo-1608549036505-bf1428f6e5db?w=400&q=80" },
  { name: "Men's Aviation Watch", price: 11999, category: "Watches", description: "Pilot's watch with slide rule bezel, dual time zone, and anti-reflective sapphire crystal.", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80" },
  { name: "Women's Bangle Watch", price: 2999, category: "Watches", description: "Gold-plated bangle watch with hidden dial and magnetic clasp. Doubles as a bracelet.", image: "https://images.unsplash.com/photo-1556015048-4d3aa10df74c?w=400&q=80" },
  { name: "Men's Solar-Powered Watch", price: 8499, category: "Watches", description: "Eco-friendly solar-powered watch with perpetual calendar, world time, and titanium case.", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d7ced?w=400&q=80" },
  { name: "Women's Art Deco Watch", price: 4499, category: "Watches", description: "Vintage-inspired Art Deco watch with rectangular case, Roman numerals, and satin ribbon strap.", image: "https://images.unsplash.com/photo-1565390366986-bcdcac7cfb95?w=400&q=80" },
  { name: "Men's Sports Digital Watch", price: 2499, category: "Watches", description: "Durable digital sports watch with stopwatch, countdown timer, alarm, and 10-bar water resistance.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { name: "Women's Flower Watch", price: 3999, category: "Watches", description: "Charming floral-design watch with mother-of-pearl dial and stainless steel bracelet.", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80" },
  { name: "Men's GMT Watch", price: 18999, category: "Watches", description: "GMT complication watch tracking two time zones simultaneously, with rotating 24-hour bezel.", image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80" },

  // ─── SPORTS (20) ───
  { name: "Yoga Mat Premium", price: 1299, category: "Sports", description: "Non-slip 6mm thick yoga mat with alignment lines, carrying strap, and eco-friendly TPE material.", image: "https://images.unsplash.com/photo-1601925228842-5a3a60b84282?w=400&q=80" },
  { name: "Adjustable Dumbbell Set", price: 3999, category: "Sports", description: "Space-saving adjustable dumbbell set from 2.5kg to 25kg with quick-lock mechanism.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { name: "Resistance Band Set", price: 799, category: "Sports", description: "Set of 5 latex resistance bands with handles, ankle straps, and door anchor. Full body workout.", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80" },
  { name: "Football Pro", price: 1499, category: "Sports", description: "FIFA-approved match football with butyl bladder and 32-panel design for consistent flight.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80" },
  { name: "Badminton Racket Set", price: 2299, category: "Sports", description: "Professional badminton set with 2 rackets, 3 shuttlecocks, and carry bag. Isometric head design.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80" },
  { name: "Gym Gloves", price: 699, category: "Sports", description: "Padded weight lifting gloves with wrist support and breathable mesh back. Prevents calluses.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { name: "Skipping Rope Speed", price: 599, category: "Sports", description: "Adjustable speed skipping rope with ball bearing handles and PVC rope. Professional grade.", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80" },
  { name: "Tennis Racket", price: 3499, category: "Sports", description: "Graphite tennis racket with 100 sq inch head, pre-strung, and shock-absorbing dampener.", image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400&q=80" },
  { name: "Cycling Helmet", price: 1999, category: "Sports", description: "Lightweight aerodynamic cycling helmet with 20 vents, adjustable retention system, and sun visor.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { name: "Swimming Goggles", price: 899, category: "Sports", description: "Anti-fog UV-protection swimming goggles with silicone seal and wide peripheral vision.", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80" },
  { name: "Basketball Size 7", price: 1799, category: "Sports", description: "Official size 7 indoor/outdoor basketball with composite leather cover and deep channel design.", image: "https://images.unsplash.com/photo-1546519638405-a2d63b5def2c?w=400&q=80" },
  { name: "Foam Roller", price: 899, category: "Sports", description: "High-density EVA foam roller for muscle recovery, trigger point therapy, and flexibility training.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { name: "Boxing Gloves", price: 2499, category: "Sports", description: "Premium leather boxing gloves with multi-layer foam padding and hook-and-loop wrist closure.", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80" },
  { name: "Pull-Up Bar Doorway", price: 1499, category: "Sports", description: "No-screw doorway pull-up bar with foam grip handles and multi-grip positions. Up to 120kg.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { name: "Cycling Jersey", price: 1299, category: "Sports", description: "Breathable moisture-wicking cycling jersey with 3 rear pockets, full-length zipper, and UPF50+.", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80" },
  { name: "Table Tennis Set", price: 1999, category: "Sports", description: "Complete table tennis set with 2 bats, 6 balls, retractable net, and carry case.", image: "https://images.unsplash.com/photo-1611251135345-18c56206b863?w=400&q=80" },
  { name: "Gym Protein Shaker", price: 399, category: "Sports", description: "Leak-proof 700ml protein shaker with mixing ball, measurement markings, and snap lid.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { name: "Volleyball", price: 1299, category: "Sports", description: "Official size indoor volleyball with 18-panel design, butyl bladder, and premium PU cover.", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80" },
  { name: "Ab Roller Wheel", price: 799, category: "Sports", description: "Double wheel ab roller with knee pad for core strengthening and stability training.", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80" },
  { name: "Sports Water Bottle 1L", price: 699, category: "Sports", description: "BPA-free insulated sports bottle keeping drinks cold 24hrs and hot 12hrs. Leak-proof lid.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80" },
];

const seed = async () => {
  await connectDB();
  
  // Only add products that don't already exist (match by name)
  const existingNames = (await Product.find({}, "name")).map(p => p.name);
  const toInsert = products.filter(p => !existingNames.includes(p.name));
  
  if (toInsert.length === 0) {
    console.log("All products already exist. Nothing to add.");
    process.exit(0);
  }

  await Product.insertMany(toInsert);
  console.log(`✅ Successfully added ${toInsert.length} new products!`);
  console.log(`📦 Total products now: ${existingNames.length + toInsert.length}`);
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
