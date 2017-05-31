
new Vue({
	el:"#app",
	data:{
		head:"XX商城",
		totalMoney:0,
		productList:[],
		checkAll:false,
		delFlag:false,
	},
	filters:{
		formatMoney: function (value,quentity) {
			if(!quentity)quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},
	mounted: function(){
		var _this = this;
		this.cartView();
	},
	
	methods:{
		cartView: function () {
			this.$http.get("data/cartData.json").then(response=>{
				var res = response.data;
				if(res && res.status=="1"){
					this.productList = res.result.list;
					this.calcTotalMoney();
				}
				
			});
		},
		selectAll: function (isCheck) {
			this.checkAll=isCheck;
			this.productList.forEach(function (item) {
				if(typeof item.checked == "undefined"){
					Vue.set(item,"checked",isCheck);
				}else{
					item.checked = isCheck;
				}
			})
			this.calcTotalMoney();
		},
		selectedProduct: function (product) {
			if(typeof product.checked == "undefined"){
				//Vue.set(product,"checked",true);
				this.$set(product,"checked",true);
			}else{
				product.checked = !product.checked;
			}
			this.calcTotalMoney();
			this.isCheckAll();
		},
	 
		isCheckAll: function () {
			let flag = true;
			this.productList.forEach(function (item) {
				if(!item.checked){
					flag = false;
				}
			})
			if(flag){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}

		},
		calcTotalMoney: function () {
			let totalMoney = 0;
			this.productList.forEach(function (item) {
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity;
				}
			});
			this.totalMoney = totalMoney;
			
		},
		changeMoney: function (product,way) {
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1;
				}
			}
			this.calcTotalMoney();
			
		},
		delProduct: function(){
			this.productList.splice(this.pindex,1);
			this.delFlag = false;
		},
	}
});
