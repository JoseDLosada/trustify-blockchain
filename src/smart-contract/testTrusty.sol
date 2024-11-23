// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @custom:security-contact daolabb@gmail.com
contract Trustify is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ERC20Votes {
    // Definición de Variables
    uint8 public token_compra;  // variable que toma la cantidad de tokens asignados al validar la entrega
    string public status; // Variable que detalla el estatus del usuario
    mapping(address => uint256) public total_token; // Acumulado de tokens por dirección
    
    // Constantes para los diferentes estatus
    uint256 private constant TOKENS_PER_PURCHASE = 10000; // Tokens por cada 10000 de compra
    uint256 private constant INICIADOR_THRESHOLD = 20;
    uint256 private constant VISIONARIO_THRESHOLD = 40;
    uint256 private constant ARQUITECTO_THRESHOLD = 100;

    constructor(address initialOwner)
        ERC20("trustify", "TRUS")
        Ownable(initialOwner)
        ERC20Permit("trustify")
    {
        _mint(initialOwner, 100000 * 10 ** decimals()); // Inicializar con 100000 tokens
    }

    // Función para asignar tokens basado en el monto de compra
    function asignarTokensPorCompra(address usuario, uint256 montoCompra) public onlyOwner {
        require(montoCompra > 0, "El monto de compra debe ser mayor a 0");
        
        // Calcular tokens a asignar (1 token por cada 10000)
        uint256 tokensAAsignar = (montoCompra / 10000);
        
        // Actualizar el total de tokens del usuario
        total_token[usuario] += tokensAAsignar;
        
        // Mint los nuevos tokens al usuario
        _mint(usuario, tokensAAsignar * 10 ** decimals());
        
        // Actualizar el status basado en el nuevo total
        actualizarStatus(usuario);
    }

    // Función para actualizar el status del usuario
    function actualizarStatus(address usuario) internal {
        uint256 tokenBalance = total_token[usuario];
        
        if (tokenBalance >= ARQUITECTO_THRESHOLD) {
            status = "Arquitecto";
        } else if (tokenBalance >= VISIONARIO_THRESHOLD) {
            status = "Visionario";
        } else if (tokenBalance >= INICIADOR_THRESHOLD) {
            status = "Iniciador";
        } else {
            status = "Explorador";
        }
    }

    // Función para consultar el balance de tokens de un usuario
    function consultarBalance(address usuario) public view returns (uint256) {
        return total_token[usuario];
    }

    // Función para consultar el status actual de un usuario
    function consultarStatus(address usuario) public view returns (string memory) {
        uint256 tokenBalance = total_token[usuario];
        
        if (tokenBalance >= ARQUITECTO_THRESHOLD) {
            return "arquitecto";
        } else if (tokenBalance >= VISIONARIO_THRESHOLD) {
            return "visionario";
        } else if (tokenBalance >= INICIADOR_THRESHOLD) {
            return "iniciador";
        } else {
            return "sin status";
        }
    }

    // Funciones requeridas por OpenZeppelin
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function clock() public view override returns (uint48) {
        return uint48(block.timestamp);
    }

    function CLOCK_MODE() public pure override returns (string memory) {
        return "mode=timestamp";
    }

    // Overrides requeridos por Solidity
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}