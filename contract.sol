// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import {ERC20} from"./ERC20.sol";
// контракт - создание токена на основе erc20
contract Token is ERC20 {
    address public owner;
    uint public price;

    constructor(string memory _name,
    string memory _symbol,
    uint initialSupply,
    uint _price,
    address _owner) ERC20(_name, _symbol) {
        owner = _owner;
        price = _price;
        mint(owner, initialSupply * 10 ** decimals());
    }

    function setApprove(address _owner, address spender, uint value) public {
        // approve с явным указание owner
        _approve(_owner, spender, value);
    }

    function getPrice() public view returns(uint){
        // получение цены токена
        return price;
    }

    function decimals() public view virtual override returns (uint8) {
        // переопределяем decimals
        return 12;
    }

    function mint(address _owner, uint value) public {
        // переопределяем mint
        _mint(_owner, value);
    }
}
// главный контракт, создает объекты, предоставляет данные
contract Factory {

    Token public gerda;
    Token public krendel;
    Token public rtk;
    Token public lp;

    Staking public staking;

    address public owner;
    address[] public poolsList;

    constructor() {
        owner = msg.sender;
        // создаем токены
        gerda = new Token("GerdaCoin", "GERDA", 100000, 1 ether, msg.sender);
        krendel = new Token("KrendelCoin", "KRENDEL", 150000, 1.5 ether, msg.sender);
        rtk = new Token("RTKCoin", "RTK", 300000, 3 ether, msg.sender);
        lp = new Token("Professional", "PROFI", 0, 6 ether, msg.sender);

        // создаем staking
        staking = new Staking(lp);

        // создаем пулы
        addPool("first Pool", gerda, krendel, 1500, 1500, 0x15bDC5Ff2d3a12690EA91A5B8E45C9AcdE72869C);
        addPool("second Pool", krendel, rtk, 3000, 3000, 0xAC6846ee88cA107B3f4bAC52D324010Fa1e3734b);
        initBalance(0xAb792Ac65e93c467ab3a6BE36dAC404F23d40a62);

    }

    function addPool(string memory name, Token first, Token second, uint amount1, uint amount2, address _owner) public {
        // функция добавления пула
        Pool pool = new Pool(name, first, second, amount1 * 1 ether, amount2 * 1 ether, lp, _owner);
        first.setApprove(owner, address(this), amount1 * 1 ether / first.getPrice());
        second.setApprove(owner, address(this), amount2 * 1 ether / second.getPrice());

        first.transferFrom(owner, address(pool), amount1 * 1 ether / first.getPrice());
        second.transferFrom(owner, address(pool), amount2 * 1 ether / second.getPrice());
        poolsList.push(address(pool));
    }
    function getPools() public view returns(address[] memory){
        // получение списка пулов
        return poolsList;
    }

    function initBalance(address account) public{
        // инициализация баланса пользователя
        gerda.setApprove(owner, address(this), 10000);
        krendel.setApprove(owner, address(this), 10000);
        rtk.setApprove(owner, address(this), 10000);

        gerda.transferFrom(owner, account, 10000);
        krendel.transferFrom(owner, account, 10000);
        rtk.transferFrom(owner, account, 10000);

    }
    function getTokens() public view returns (Token[] memory){
        // получение токенов
        Token[] memory tokens = new Token[](4);
        tokens[0] = gerda;
        tokens[1] = krendel;
        tokens[2] = rtk;
        tokens[3] = lp;
        return tokens;
    }
    function getTokenBalances() public view returns(uint[] memory){
        // получение баланса токенов у пользователя
        uint[] memory tokens = new uint[](4);
        tokens[0] = gerda.balanceOf(msg.sender);
        tokens[1] = krendel.balanceOf(msg.sender);
        tokens[2] = rtk.balanceOf(msg.sender);
        tokens[3] = lp.balanceOf(msg.sender);
        return tokens;
    }

    function getStaking() public view returns(Staking) {
        // получаем объект staking
        return staking;
    }
}
// отвечает за создание пула и работу с ним
contract Pool {
    Token public lp;
    PoolItem public pool;
    
    Token public first;
    Token public second;

    struct PoolItem{
        string name;
        address owner;
        Token first; // первый токен
        Token second; // второй токен
        uint ratio; // отношение
        uint firstETH; // eth для первого токена
        uint secondETH; // eth для второго токена
        uint firstTokens; // количество первого токена
        uint secondTokens; // количество второго токена
        address[] supporters;
    }
    constructor(string memory name, Token _first, Token _second, uint amount1, uint amount2, Token _lp, address _owner) {
        lp = _lp;
        first = _first;
        second = _second;
        uint firstTokens = amount1 / first.getPrice();
        uint secondTokens = amount2 / second.getPrice();
        // создаем объект пула
        pool = PoolItem(name, _owner, _first, _second, amount1 / amount2, amount1 / (10 ** 18), amount2 / (10 ** 18), firstTokens, secondTokens, new address[](0));
    }

    function swapTokens(Token token, uint amount) public {
        // обмен приходящего токена на токен из пула
        require(token.balanceOf(address(this)) >= amount, "not enought tokens!");
        uint getAmount = calculatedAmount(token, amount);
        if (token == first) {
            require(second.balanceOf(msg.sender) >= getAmount, "you have't tokens!");
            second.setApprove(msg.sender, address(this), getAmount);
            second.transferFrom(msg.sender, address(this), getAmount);
            first.transfer(msg.sender, amount); 

        } else {
            require(first.balanceOf(msg.sender) >= getAmount, "you have't tokens!");
            first.setApprove(msg.sender, address(this), getAmount);
            first.transferFrom(msg.sender, address(this), getAmount);
            second.transfer(msg.sender, amount);
        }
        setRatio();
    }

    function calculatedAmount(Token token, uint amount) public view returns(uint){
        // расчитываем количество токенов
        uint firstAmount;
        uint secondAmount;
        if (token == first) {
            firstAmount = amount * token.getPrice() * pool.firstETH;
            secondAmount = second.getPrice() * pool.secondETH;
        } else {
            firstAmount = amount * token.getPrice() * pool.secondETH;
            secondAmount = first.getPrice() * pool.firstETH;
        }
        return firstAmount / secondAmount;
    }
    function supportPool(Token token, uint amount) public {
        // функция поддержки пула
        uint lpAmount = amount / (lp.getPrice() / (10 ** 18));
        token.setApprove(msg.sender, address(this), amount);
        token.transferFrom(msg.sender, address(this), amount);
        lp.mint(address(this), lpAmount);
        lp.transfer(msg.sender, lpAmount);
        pool.supporters.push(msg.sender);
        setRatio();
    }
    function setRatio() public{
        // устанавливаем значения отношений в пуле
        pool.firstETH = first.balanceOf(address(this)) * first.getPrice() / (10 ** 18);
        pool.secondETH = second.balanceOf(address(this)) * second.getPrice() / (10 ** 18);
        pool.firstTokens = first.balanceOf(address(this));
        pool.secondTokens = second.balanceOf(address(this));
        pool.ratio = pool.firstETH / pool.secondETH;
    }

    function getPoolData() public view returns(PoolItem memory){
        // получаем данные о пуле 
        return pool;
    }

    function getSupporters() public view returns(address[] memory){
        // получаем список поддержавших пул
        return pool.supporters;
    }
}

contract Router {

}
// Staking контракт отвечает за хранение токенов ликвидности и выдачу награды
contract Staking {
    Token public lp;

    mapping(address => StakingItem) public stakingInfo;

    struct StakingItem {
        address account;
        uint tokens;
        uint lastReward; // дата получения последней награды
    }
    constructor(Token _lp) {
        lp = _lp;
    }

    function getStakingData() public view returns(StakingItem memory){
        // получаем данные о стейкинге 
        return stakingInfo[msg.sender];
    }
    function addStaking(uint amount) public {
        // создаем стейкинг или добавляем токены к существующему
        require(lp.balanceOf(msg.sender) >= amount, "not enought tokens!");
        if (stakingInfo[msg.sender].account == address(0)) {
            stakingInfo[msg.sender] = StakingItem(msg.sender, amount, block.timestamp);
        } else {
            stakingInfo[msg.sender].tokens += amount;
        }
        lp.setApprove(msg.sender, address(this), amount);
        lp.transferFrom(msg.sender, address(this), amount);
    }
    function getReward() public{
        // получаем награду
        uint timeDiff = block.timestamp - stakingInfo[msg.sender].lastReward;
        uint countLp = stakingInfo[msg.sender].tokens;
        uint allLp = lp.balanceOf(address(this));
        uint rewardPerSecond = 13;
        uint rw = countLp * timeDiff * rewardPerSecond * (countLp / allLp + 1) * (timeDiff / 30 * 5 / 100 + 1); // вычесляем награду
        lp.mint(address(this), rw);
        lp.transfer(msg.sender, rw);
        stakingInfo[msg.sender].tokens = 0;
        stakingInfo[msg.sender].lastReward = block.timestamp;
    }
}