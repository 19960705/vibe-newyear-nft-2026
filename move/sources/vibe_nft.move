module vibe_nft::vibe_nft {
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::package;
    use sui::display;

    /// NFT 对象定义
    public struct Beast has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: Url,
        zodiac: String,
        element: String,
    }

    /// 铸造事件
    public struct BeastMinted has copy, drop {
        beast_id: ID,
        minted_by: address,
    }

    /// OTW (One Time Witness)
    public struct VIBE_NFT has drop {}

    fun init(otw: VIBE_NFT, ctx: &mut TxContext) {
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"link"),
            string::utf8(b"image_url"),
            string::utf8(b"description"),
            string::utf8(b"project_url"),
            string::utf8(b"creator"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"https://vibe-nft.vercel.app/beast/{id}"),
            string::utf8(b"{image_url}"),
            string::utf8(b"{description}"),
            string::utf8(b"https://vibe-nft.vercel.app"),
            string::utf8(b"Vibe Hackathon Builder"),
        ];

        let publisher = package::claim(otw, ctx);
        let mut display = display::new_with_fields<Beast>(
            &publisher, keys, values, ctx
        );

        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    /// 铸造函数
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        zodiac: vector<u8>,
        element: vector<u8>,
        ctx: &mut TxContext
    ) {
        let id = object::new(ctx);
        let beast = Beast {
            id,
            name: string::utf8(name),
            description: string::utf8(description),
            image_url: url::new_unsafe_from_bytes(url),
            zodiac: string::utf8(zodiac),
            element: string::utf8(element),
        };

        event::emit(BeastMinted {
            beast_id: object::id(&beast),
            minted_by: tx_context::sender(ctx),
        });

        transfer::public_transfer(beast, tx_context::sender(ctx));
    }
}
