# Pantunis Mobile App - Project Requirements Document

## 1. Project Overview

### 1.1 Executive Summary
The Pantunis Mobile App is a React Native application built with Expo that brings the largest database of Malay pantun poetry to mobile users across Malaysia, Indonesia, and Singapore. The app aims to preserve and promote Malay cultural heritage through an accessible, modern mobile experience.

### 1.2 Project Goals
- Make Malay pantun accessible to mobile users
- Preserve and promote Malay cultural heritage
- Create an engaging platform for adults interested in Malay culture
- Generate revenue through advertising while keeping content free

### 1.3 Success Metrics
- 10,000+ downloads within first 6 months
- 70%+ user retention rate after 30 days
- Average session duration of 5+ minutes
- 500+ favorited pantun per 1,000 active users
- Positive app store rating (4.0+)

## 2. Market & User Analysis

### 2.1 Target Market
- **Primary Markets**: Malaysia, Indonesia, Singapore
- **Target Demographics**: Adults (25-65 years)
- **User Personas**:
  - Cultural enthusiasts seeking to explore Malay heritage
  - Educators and students of Malay literature
  - Poetry lovers interested in traditional forms
  - Diaspora communities maintaining cultural connections

### 2.2 Competitive Analysis
- Limited direct competitors in mobile pantun apps
- Opportunity to be first-to-market with comprehensive mobile solution
- Web-based poetry platforms as indirect competition

## 3. Technical Architecture

### 3.1 Technology Stack
- **Frontend**: React Native with Expo SDK
- **Backend**: Appwrite (BaaS)
- **External API**: Pantunis API (https://pantunis-api-vercel.vercel.app)
- **Platform**: Android (Phase 1), iOS (Future Phase)
- **Languages**: Malay, English

### 3.2 API Integration
- **Base URL**: https://pantunis-api-vercel.vercel.app
- **Key Endpoints**:
  - `/api/cariGunaKata?kata={keyword}` - Search by word usage
  - Sample Output: {
    "pantun_id": 671,
    "pantun_bayang1": "Banyak-banyak kucing berlari,",
    "pantun_bayang2": "Mana nak sama kucing belang?",
    "pantun_maksud1": "Banyak-banyak boleh dicari,",
    "pantun_maksud2": "Mana nak sama tuan seorang?",
    "pantun_jenis": 4,
    "sumber_id": 1,
    "sumber_tajuk": "Pantun Melayu",
    "sumber_pengkarya": "Richard J. Wilkinson dan Sir R.O. Winstedt",
    "sumber_pautan": "https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/0376"
  }
  - `/api/jumlah` - Get total count
  - Sample Output: [{"count(*)":57385}]
  - `/api/cariGunaKataTepat?kata={keyword}` - Exact word search
  - Sample Output: {
    "pantun_fts_id": 26,
    "pantun_bayang1": "Tetak teja dalam dusun,",
    "pantun_bayang2": "Tumbang ke ladang padi binasa;",
    "pantun_maksud1": "Hari senja ayam naik serun,",
    "pantun_maksud2": "Tikus melawar mencari mangsa.",
    "pantun_jenis": 4,
    "sumber_id": 1,
    "sumber_tajuk": "Pantun Melayu",
    "sumber_pengkarya": "Richard J. Wilkinson dan Sir R.O. Winstedt",
    "sumber_pautan": "https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/0376"
  }
- **Data Format**: JSON responses
- **Rate Limiting**: Respectful usage as requested by API owner

### 3.3 Appwrite Backend Services
- **Authentication**: User registration, login, password recovery
- **Database**: User favorites, reading history, app preferences
- **Storage**: User profile images, cached pantun data
- **Functions**: Search optimization, data synchronization

## 4. Core Features & Functionality

### 4.1 Authentication & User Management
- **User Registration**: Email/password signup
- **Login System**: Secure authentication via Appwrite
- **Profile Management**: Basic user profiles with preferences
- **Guest Mode**: Browse without account (limited features)

### 4.2 Pantun Discovery & Browsing
- **Home Feed**: Featured and recently added pantun
- **Categories**: Browse by themes, topics, or collections
- **Random Pantun**: Discover new content serendipitously
- **Trending**: Popular pantun based on user interactions

### 4.3 Search Functionality
- **Keyword Search**: Search pantun by specific words or phrases
- **Advanced Filters**: Filter by themes, length, or metadata
- **Search History**: Save and revisit previous searches
- **Auto-suggestions**: Intelligent search suggestions

### 4.4 Favorites & Collections
- **Bookmark System**: Save favorite pantun to personal collection
- **Custom Lists**: Create themed collections
- **Offline Access**: Download favorites for offline reading
- **Export Options**: Share collections or export as text

### 4.5 Social Sharing
- **Native Sharing**: Share pantun via device's native share sheet
- **Social Media Integration**: Direct sharing to WhatsApp, Facebook, Instagram
- **Beautiful Cards**: Generate shareable images with pantun text
- **Copy to Clipboard**: Easy text copying for manual sharing

### 4.6 Offline Reading
- **Download Management**: Download pantun for offline access
- **Storage Management**: User-controlled cache size limits
- **Sync Capabilities**: Sync favorites and progress