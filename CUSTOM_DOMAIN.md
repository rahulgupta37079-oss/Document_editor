# Custom Domain Setup Guide

This guide explains how to add a custom domain to your Cloudflare Pages deployment.

## Prerequisites
- Domain name (purchased from any registrar)
- Cloudflare account
- Project deployed to Cloudflare Pages

## Method 1: Domain Already on Cloudflare

### Step 1: Add Domain to Pages Project

Via Cloudflare Dashboard:
1. Go to https://dash.cloudflare.com
2. Select your account
3. Navigate to **Pages** → **passion3d-docs**
4. Click **Custom domains**
5. Click **Set up a custom domain**
6. Enter your domain (e.g., `docs.yourcompany.com`)
7. Click **Continue**
8. Cloudflare will automatically configure DNS
9. Wait 5-10 minutes for SSL certificate

Via Wrangler CLI:
```bash
npx wrangler pages domain add docs.yourcompany.com --project-name passion3d-docs
```

### Step 2: Verify
Visit your custom domain - it should work!

## Method 2: Domain NOT on Cloudflare

### Step 1: Add Domain to Cloudflare

1. Go to Cloudflare dashboard
2. Click **Add a Site**
3. Enter your domain name
4. Choose Free plan
5. Click **Add site**

### Step 2: Update Nameservers

Cloudflare will provide 2 nameservers like:
```
reza.ns.cloudflare.com
tamara.ns.cloudflare.com
```

Update at your domain registrar:
- **GoDaddy**: Domain Settings → Nameservers → Change → Custom
- **Namecheap**: Domain List → Manage → Nameservers → Custom DNS
- **Google Domains**: DNS → Name servers → Custom name servers
- **Other**: Check registrar documentation

### Step 3: Wait for Propagation
- Usually 5-30 minutes
- Can take up to 24 hours
- Check status in Cloudflare dashboard

### Step 4: Add to Pages Project
Follow Method 1, Step 1 above

## Popular Domain Configurations

### Root Domain
```
Domain: yourcompany.com
Points to: passion3d-docs.pages.dev
```

### Subdomain
```
Domain: docs.yourcompany.com
Points to: passion3d-docs.pages.dev
```

### Multiple Domains
You can add multiple domains to one project:
```
1. docs.yourcompany.com (primary)
2. documents.yourcompany.com
3. generator.yourcompany.com
```

## DNS Configuration

### Automatic (Recommended)
Cloudflare Pages automatically creates:
```
Type: CNAME
Name: docs
Content: passion3d-docs.pages.dev
Proxy: Yes (Orange cloud)
```

### Manual (Advanced)
If you need custom DNS:

1. Go to Cloudflare DNS settings
2. Add CNAME record:
   - Type: CNAME
   - Name: docs (or @ for root)
   - Target: passion3d-docs.pages.dev
   - Proxy status: Proxied
   - TTL: Auto

## SSL/HTTPS Setup

### Automatic SSL (Default)
Cloudflare provides:
- ✅ Free SSL certificate
- ✅ Auto-renewal
- ✅ Universal SSL
- ✅ Active within 15 minutes

### Force HTTPS
1. Go to SSL/TLS → Edge Certificates
2. Enable **Always Use HTTPS**
3. Enable **Automatic HTTPS Rewrites**

### Advanced: Custom Certificates
For enterprise needs:
1. SSL/TLS → Edge Certificates
2. Upload custom certificate
3. Add private key

## Verification Steps

### 1. DNS Propagation
```bash
dig docs.yourcompany.com
nslookup docs.yourcompany.com
```

Should show Cloudflare IPs.

### 2. SSL Certificate
```bash
curl -I https://docs.yourcompany.com
```

Should return `200 OK` with HTTPS.

### 3. Browser Test
Visit in browser - should show:
- 🔒 Padlock icon (HTTPS)
- ✅ Your document generator
- ✅ Fast load time

## Troubleshooting

### "DNS_PROBE_FINISHED_NXDOMAIN"
**Cause**: DNS not propagated or incorrect nameservers

**Solution**:
- Wait 24 hours for propagation
- Verify nameservers at registrar
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo killall -HUP mDNSResponder` (Mac)

### "Too Many Redirects"
**Cause**: SSL mode mismatch

**Solution**:
- SSL/TLS → Overview
- Set to "Full" or "Full (strict)"

### "522 Connection Timed Out"
**Cause**: Origin server issue

**Solution**:
- Check Pages deployment status
- Verify project is deployed
- Check Cloudflare status page

### Certificate Not Trusted
**Cause**: SSL provisioning incomplete

**Solution**:
- Wait 15 minutes for SSL
- Check SSL/TLS → Edge Certificates
- Verify "Universal SSL Status" is Active

## Performance Optimization

### Enable Speed Features
1. **Brotli Compression**
   - Speed → Optimization
   - Enable Brotli

2. **Rocket Loader**
   - Speed → Optimization  
   - Enable Rocket Loader

3. **Auto Minify**
   - Speed → Optimization
   - Check CSS, HTML, JavaScript

4. **HTTP/3**
   - Network → Enable HTTP/3

### CDN Caching
Already enabled by default:
- Static assets cached globally
- 300+ edge locations
- < 100ms latency worldwide

## Security Best Practices

### 1. Enable Security Features
```
- WAF (Web Application Firewall)
- DDoS Protection (automatic)
- Bot Fight Mode
- Browser Integrity Check
```

### 2. Configure Page Rules
Create rules for enhanced security:
```
docs.yourcompany.com/*
- Security Level: High
- Cache Level: Standard
- Always Online: On
```

### 3. Access Control (Optional)
For private docs:
```
- Cloudflare Access
- IP restrictions
- Email authentication
```

## Cost Breakdown

### Free Tier Includes:
- ✅ Unlimited custom domains
- ✅ Unlimited SSL certificates
- ✅ Unlimited bandwidth
- ✅ 500 builds/month
- ✅ DDoS protection
- ✅ Global CDN

### Paid Features (Optional):
- Load Balancing: $5/month
- Page Rules: $5/month for 20 rules
- Workers: $5/month for 10M requests
- Access: $3/user/month

## Domain Recommendations

### Best Domain Registrars
1. **Cloudflare Registrar** (cheapest, at-cost)
2. **Namecheap** (good UI, affordable)
3. **Google Domains** (simple, reliable)
4. **Porkbun** (cheap renewals)

### Domain Suggestions
For document generator:
```
- docs.yourcompany.com
- documents.yourcompany.com
- generate.yourcompany.com
- offers.yourcompany.com
- hr-docs.yourcompany.com
- internships.yourcompany.com
```

## Example Configurations

### Example 1: Startup
```
Domain: docs.techstartup.com
Setup: Subdomain
SSL: Automatic
CDN: Enabled
Cost: Free
Time: 15 minutes
```

### Example 2: Enterprise
```
Domain: documents.bigcorp.com
Setup: Root domain with redirect
SSL: Custom certificate
CDN: Enabled with custom caching
Access: IP whitelist + SSO
Cost: $10/month
Time: 1 hour
```

### Example 3: Agency
```
Domains: 
- client1-docs.agency.com
- client2-docs.agency.com
- client3-docs.agency.com
Setup: Multiple subdomains
SSL: Wildcard certificate
CDN: Enabled
Cost: Free
Time: 30 minutes total
```

## Post-Setup Checklist

After domain is live:
- [ ] Test HTTPS access
- [ ] Verify all pages load
- [ ] Check mobile responsiveness
- [ ] Test PDF generation
- [ ] Test AI features
- [ ] Verify API endpoints work
- [ ] Update documentation links
- [ ] Update social media links
- [ ] Add to Google Search Console
- [ ] Set up monitoring (Uptime Robot)
- [ ] Configure analytics (optional)

## Monitoring Your Domain

### Uptime Monitoring
Free services:
- UptimeRobot (50 monitors free)
- Pingdom (1 monitor free)
- StatusCake (10 monitors free)

### Analytics
- Cloudflare Analytics (built-in)
- Google Analytics (optional)
- Plausible (privacy-focused)

### Alerts
Set up notifications for:
- Downtime
- SSL expiry (auto-renews, but good to monitor)
- Traffic spikes
- Error rate increases

## Support Resources

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
- **Community**: https://community.cloudflare.com/

## Need Help?

Common questions:
1. **How long does DNS take?** Usually 5-30 minutes
2. **Can I use apex/root domain?** Yes! Use CNAME flattening
3. **Multiple domains?** Yes, unlimited on free tier
4. **Remove www?** Configure redirect rule
5. **Email on same domain?** Use MX records (separate)

---

**Still stuck?** Check troubleshooting section or open an issue on GitHub.
