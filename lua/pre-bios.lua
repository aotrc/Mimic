
--  Some functions are taken from the ComputerCraft bios.lua, 
--  which was written by dan200

--  I just cleaned up the code a bit


xpcall = function(_fn, _fnErrorHandler)
	assert(type(_fn) == "function", "bad argument #1 to xpcall (function expected, got " .. type(_fn) .. ")")

	local co = coroutine.create(_fn)
	local coroutineClock = os.clock()
	debug.sethook(co, function() if coroutineClock+3 >= os.clock() then print("Lua: Too long with") error("Too long without yielding",2) end end, "", 10000)
	local results = {coroutine.resume(co)}
	debug.sethook(co)
	while coroutine.status(co) ~= "dead" do
		coroutineClock = os.clock()
		debug.sethook(co, function() if coroutineClock+3 >= os.clock() then print("Lua: Too long with") error("Too long without yielding",2) end end, "", 10000)
		results = {coroutine.resume(co, coroutine.yield())}
		debug.sethook(co)
	end

	if results[1] == true then
		return true, unpack(results, 2)
	else
		return false, _fnErrorHandler(results[2])
	end
end


pcall = function(_fn, ...)
	assert(type(_fn) == "function", "bad argument #1 to pcall (function expected, got " .. type(_fn) .. ")")

	local args = {...}
	return xpcall(
		function()
			return _fn(unpack(args))
		end,
		function(_error)
			return _error
		end
	)
end