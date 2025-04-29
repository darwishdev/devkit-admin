link:
	rm -rf package-lock.json node_modules/devkit-admin && yalc update devkit-admin && pnpm cache delete && pnpm i
	
sync_api:
	pnpm cache delete && pnpm add @buf/ahmeddarwish_devkit-api.bufbuild_es@${V}


install:
	rm -rf node_modules &&  pnpm i && make link

run:
	pnpm run dev
