


bump:
	jq '(.version | split(".") | .[2] |= (tonumber + 1) | join(".")) as $$v | .version = $$v' package.json > tmp.$$$$ && mv tmp.$$$$ package.json

buld:
	make bump && pnpm run build && yalc push

install:
	rm -rf node_modules  package-lock.json && pnpm cache delete && pnpm i 
link:
	npm link

linkc:
	npm link 
	

publish:
	make buld && npm publish 
	
sync_api:
	pnpm cache delete && pnpm add @buf/ahmeddarwish_devkit-api.bufbuild_es@${V}

