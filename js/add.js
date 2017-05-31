new Vue({
	el:"#add",
	data:{
		head:"XX商城",
		addList:[],
		limitNum:1,
		addSelect:0,
		loadMores:false
	},
	mounted:function (){
		this.$nextTick(function(){
			this.addView();
		})
		
	},
	computed: {
		showList:function (){
			return this.addList.slice(0,this.limitNum);
		}
	},
	methods:{
		addView: function () {
			this.$http.get("data/add.json").then(response=>{
				var res = response.data;
				if(res && res.status=="2"){
					this.addList = res.result;
				
				}
				
			});
		},
		setDefault: function(addrId) {
			var _this = this;
			_this.showList.forEach(function (item) {

				if(item.addressId==addrId){
					item.isDefault = true;
					
				}else{
					item.isDefault = false;
				}
				console.log(item.addId+"::"+item.isDefault);
			});
		},
		loadMore:function(){
			this.loadMores = true;
			this.limitNum = this.addList.length;
			
		},
		close:function(){
			this.limitNum=1;
			this.loadMores = false;
		}
	}
})
