# 1. Build project
pnpm run build

# 3. Copy config nginx
sudo cp daftar.mtsn1pandeglang.sch.id /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/daftar.mtsn1pandeglang.sch.id /etc/nginx/sites-enabled/

# 4. Test & reload
sudo nginx -t
sudo systemctl reload nginx



sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d daftar.mtsn1pandeglang.sch.id
